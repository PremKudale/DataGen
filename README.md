Dataset Configuration Application
Overview
The Dataset Configuration Application is a React-based tool that allows users to create database schemas by adding tables and fields with various constraints. The application then converts the schema into JSON format and interacts with a backend service to generate synthetic data, which can be downloaded as a CSV file. It?s a powerful tool for users looking to simulate data based on custom table structures.
Features
* Add and Manage Tables: Easily create tables and manage them with simple UI controls.
* Add Fields to Tables: Each table can have multiple fields with customizable properties like name, type, and constraints.
* Constraint Options: Select from a variety of field constraints including NOT NULL, PRIMARY KEY, UNIQUE, FOREIGN KEY, and more.
* Convert to JSON: Convert the table and field schema to JSON format.
* Generate Synthetic Data: Send the schema to a backend API for generating synthetic data, which can be downloaded as a CSV file.
* Foreign Key Relations: Detect and display foreign key relationships between tables automatically.
Technology Stack
* Frontend: React with TypeScript
* UI Styling: Tailwind CSS
* Icons: Lucide-react
* HTTP Client: Axios
* Backend Integration: Fetch API (for synthetic data generation)

Installation

1. Clone the repository:
bash
git clone <repository-url>
cd <repository-directory>

2. Install dependencies:

bash
Copy code
npm install

3. Run the development server:

steps:
1. newE/Scripts/Activate
2. cd \synthetic_data_project\
3. python manage.py runserver

4. Run the Frontend :

steps:
1. cd frontend
2. cd 13_Stenz
3. npm run dev 

This will start the development server, and the application should be available at http://localhost:3000.
Usage
Adding Tables
1. Click the "Add Table" button to create a new table.
2. Enter the table name in the input field.
Adding Fields
1. Click the "Add Field" button to add fields to the table.
2. For each field, specify the name, type, and any constraints (e.g., PRIMARY KEY, FOREIGN KEY).
JSON Conversion
* Once you?ve set up your tables and fields, click the "Convert to JSON" button to view the generated JSON output of the schema.
Generate Synthetic Data
1. Click the "Generate Synthetic Data" button to send the schema to the backend.
2. The synthetic data will be generated and downloaded as a CSV file.
API Integration
The application is integrated with a backend API that generates synthetic data. The API expects the schema in JSON format along with the number of rows to generate.
* Backend API Endpoint:
ruby
Copy code
http://127.0.0.1:8000/api/generate_synthetic_data/
* Payload:
json
Copy code
{
  "schema": [
    {
      "table_name": "Table1",
      "fields": [
        {
          "field_name": "ID",
          "field_type": "Integer",
          "constraints": "PRIMARY KEY"
        }
      ]
    }
  ],
  "num_rows": 100
}
Foreign Key Relations
The application automatically detects foreign key relationships between tables. It displays them when present, showing which field in one table references the primary key of another table.
File Structure
bash
Copy code
src/
    components/
        DatasetConfig.tsx   # Main component handling the entire dataset configuration
    App.tsx                 # Application entry point

Dependencies
The project depends on the following libraries:
* React: JavaScript library for building the user interface.
* TypeScript: Provides type safety and better tooling.
* Lucide-react: Icon library for React.
* Axios: For making HTTP requests to the backend.
* Tailwind CSS: Utility-first CSS framework for styling.
To install all the dependencies, run:
bash
Copy code
npm install
Future Improvements
* Custom Row Input: Allow users to specify the number of rows for synthetic data generation.
* Field Validation: Add validation to ensure no duplicate field names.
* Improved UI: Add drag-and-drop functionality for table and field reordering.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

Author
Likhit Chirmade GitHub

