from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

# Path to ChromeDriver
chrome_driver_path = r"C:\Users\LikhitChirmade\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe"

# Setup the WebDriver
service = Service(chrome_driver_path)
driver = webdriver.Chrome(service=service)

# Open the DataGeN web application
driver.get("http://localhost:5173/dataset-config")

# Step 1: Enter dataset title and add dataset
dataset_input = driver.find_element(By.XPATH, "//input[@placeholder='Enter dataset title']")
dataset_input.send_keys("College")

add_dataset_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Dataset')]")
add_dataset_btn.click()

# Wait for the 'College' button to become clickable
college_btn = WebDriverWait(driver, 15).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "button.mb-2.mr-2.px-4.py-2.rounded.bg-gray-200"))
)
college_btn.click()

# Step 2: Enter table name and add table
table_input = driver.find_element(By.XPATH, "//input[@placeholder='Enter table name']")
table_input.send_keys("Student")

add_table_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Table')]")
add_table_btn.click()

# Step 3: Click the "Add Field" button
add_field_button = WebDriverWait(driver, 15).until(
    EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'bg-green-500') and contains(text(), 'Add Field')]"))
)
add_field_button.click()

# Now the field name, data type, and constraint options should be visible

# Step 4: Add field "id" with type "Integer" and set as primary key

# Wait for the field name input to be present and then enter the field name as "id"
field_name_input = WebDriverWait(driver, 15).until(
    EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Field Name' and contains(@class, 'border') and contains(@class, 'rounded')]"))
)
field_name_input.send_keys("id")

# Step 5: Click the dropdown to select field type
field_type_dropdown = WebDriverWait(driver, 15).until(
    EC.element_to_be_clickable((By.XPATH, "//select[@class='border rounded p-1 mr-2']"))
)
field_type_dropdown.click()

# Step 6: Select 'Integer' from the dropdown options
integer_option = WebDriverWait(driver, 15).until(
    EC.element_to_be_clickable((By.XPATH, "//option[@value='Integer']"))
)
integer_option.click()

# Step 7: Select 'Primary Key' from the constraint dropdown
constraint_select = WebDriverWait(driver, 15).until(
    EC.element_to_be_clickable((By.XPATH, "(//select[contains(@class, 'border rounded p-1 mr-2')])[2]"))
)
constraint_select.click()

primary_key_option = WebDriverWait(driver, 15).until(
    EC.presence_of_element_located((By.XPATH, "//option[contains(text(), 'PRIMARY KEY')]"))
)
primary_key_option.click()

# Add the field
add_field_btn = WebDriverWait(driver, 15).until(
    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Field')]"))
)
add_field_btn.click()

# Step 8: Enter number of records and generate synthetic data
num_records_input = driver.find_element(By.XPATH, "//input[@value='100']")
num_records_input.clear()
num_records_input.send_keys("100")

generate_data_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Generate Synthetic Data')]")
generate_data_btn.click()

# Wait for download
time.sleep(20)

# Check for the downloaded file
download_dir = r"C:\Users\LikhitChirmade\Downloads"
files = os.listdir(download_dir)
if "synthetic_data.csv" in files:
    print("Test Passed: CSV file generated and downloaded successfully.")
else:
    print("Test Failed: CSV file not found.")

# Close the browser
driver.quit()
