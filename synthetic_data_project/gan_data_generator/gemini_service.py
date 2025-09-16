import logging
import google.generativeai as genai
from django.conf import settings
import json
import csv
import io

logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GOOGLE_API_KEY)

def generate_text(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text

def generate_image(prompt):
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content(prompt)
    return response.text  # This will return a description of the image

def generate_synthetic_data(schema, num_rows):
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        Generate synthetic data based on the following schema:
        {json.dumps(schema, indent=2)}
        
        Please generate {num_rows} rows of data.
        Ensure that the data is realistic and follows these guidelines:
        - For 'name' columns, use realistic names.
        - For 'id' columns, use unique integers.
        - For other columns, generate appropriate data based on the column name and type.
        
        Return the data as a CSV string, with headers.
        """
        
        response = model.generate_content(prompt)
        
        # Extract the CSV content from the response
        csv_content = response.text.strip()
        
        # If the response is wrapped in code blocks, remove them
        if csv_content.startswith('```') and csv_content.endswith('```'):
            csv_content = csv_content[3:-3].strip()
        
        # Validate and clean the CSV data
        csv_reader = csv.reader(io.StringIO(csv_content))
        headers = next(csv_reader)
        rows = list(csv_reader)
        
        # Ensure we have the correct number of rows
        rows = rows[:num_rows]
        while len(rows) < num_rows:
            rows.append(['' for _ in headers])
        
        # Create a new CSV string with the cleaned data
        output = io.StringIO()
        csv_writer = csv.writer(output)
        csv_writer.writerow(headers)
        csv_writer.writerows(rows)
        
        return output.getvalue()
    
    except Exception as e:
        raise Exception(f"Error generating synthetic data: {str(e)}")
