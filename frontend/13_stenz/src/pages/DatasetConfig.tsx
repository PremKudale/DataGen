import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Field {
  name: string;
  type: string;
  constraints: string;
}

interface Table {
  name: string;
  fields: Field[];
  showContents: boolean;
}

interface Dataset {
  title: string;
  tables: Table[];
}

const DatasetConfig: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]); // State to hold multiple datasets
  const [activeDatasetIndex, setActiveDatasetIndex] = useState<number | null>(null); // Index of the currently active dataset
  const [newTableName, setNewTableName] = useState<string>(''); // State for new table name input
  const [jsonOutput, setJsonOutput] = useState<string>(''); // State to store the JSON output
  const [datasetTitle, setDatasetTitle] = useState<string>(''); // State for dataset title
  const [numRows, setNumRows] = useState<number>(100); // State for number of rows for data generation
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const constraintsOptions = ['None', 'NOT NULL', 'UNIQUE', 'PRIMARY KEY', 'DEFAULT', 'AUTO_INCREMENT', 'FOREIGN KEY'];
  const buttonStyles = 'px-4 py-2 text-sm rounded mb-2'; // Common button size

  const addDataset = () => {
    if (datasetTitle.trim() === '') {
      alert('Please enter a dataset title.'); // Alert if the dataset title is empty
      return;
    }
    setDatasets([...datasets, { title: datasetTitle, tables: [] }]);
    setDatasetTitle(''); // Clear the input after adding the dataset
  };

  const selectDataset = (index: number) => {
    setActiveDatasetIndex(index); // Set the active dataset index
    setNewTableName(''); // Clear the new table name input
    setJsonOutput(''); // Clear the JSON output when switching datasets
  };

  const addTable = () => {
    if (newTableName.trim() === '') {
      alert('Please enter a table name.'); // Alert if the table name is empty
      return;
    }

    if (activeDatasetIndex === null) {
      alert('Please select a dataset to add a table.'); // Alert if no dataset is selected
      return;
    }

    const updatedDatasets = [...datasets];
    updatedDatasets[activeDatasetIndex].tables.push({ name: newTableName, fields: [], showContents: false });
    setDatasets(updatedDatasets);
    setNewTableName(''); // Clear the input after adding the table
  };

  const addField = (tableIndex: number) => {
    if (activeDatasetIndex === null) return; // Exit if no dataset is selected

    const updatedDatasets = [...datasets];
    updatedDatasets[activeDatasetIndex].tables[tableIndex].fields.push({ name: '', type: 'String', constraints: 'None' });
    setDatasets(updatedDatasets);
  };

  const removeTable = (index: number) => {
    if (activeDatasetIndex === null) return; // Exit if no dataset is selected

    const updatedDatasets = [...datasets];
    updatedDatasets[activeDatasetIndex].tables = updatedDatasets[activeDatasetIndex].tables.filter((_, i) => i !== index);
    setDatasets(updatedDatasets);
  };

  const removeField = (tableIndex: number, fieldIndex: number) => {
    if (activeDatasetIndex === null) return; // Exit if no dataset is selected

    const updatedDatasets = [...datasets];
    updatedDatasets[activeDatasetIndex].tables[tableIndex].fields = updatedDatasets[activeDatasetIndex].tables[tableIndex].fields.filter((_, i) => i !== fieldIndex);
    setDatasets(updatedDatasets);
  };

  const handleFieldChange = (
    tableIndex: number,
    fieldIndex: number,
    fieldName: keyof Field,
    value: string
  ) => {
    if (activeDatasetIndex === null) return; // Exit if no dataset is selected

    const updatedDatasets = [...datasets];
    updatedDatasets[activeDatasetIndex].tables[tableIndex].fields[fieldIndex][fieldName] = value;
    setDatasets(updatedDatasets);
  };

  const toggleShowContents = (tableIndex: number) => {
    if (activeDatasetIndex === null) return; // Exit if no dataset is selected

    const updatedDatasets = [...datasets];
    updatedDatasets[activeDatasetIndex].tables[tableIndex].showContents = !updatedDatasets[activeDatasetIndex].tables[tableIndex].showContents;
    setDatasets(updatedDatasets);
  };

  const convertToJson = () => {
    if (activeDatasetIndex === null) return; // Exit if no dataset is selected

    const jsonData = JSON.stringify(datasets[activeDatasetIndex], null, 2); // Pretty-print the JSON with 2-space indentation
    setJsonOutput(jsonData); // Set the JSON output state
  };

  const handleGenerateData = async () => {
    if (activeDatasetIndex === null) {
      setError('Please select a dataset first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const schema = datasets[activeDatasetIndex].tables.map(table => ({
      table_name: table.name,
      fields: table.fields.map(field => ({
        field_name: field.name,
        field_type: field.type,
        constraints: field.constraints
      }))
    }));

    try {
      const response = await axios.post(
         'http://localhost:8000/api/generate_synthetic_data/',
        { schema, num_rows: numRows },
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      let filename = 'synthetic_data.csv';
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }

      // Create Blob and download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to generate data:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl p-4">
      <h1 className="text-3xl font-bold mb-6 text-left">Dataset Configuration</h1>

      {/* Input for Dataset Title */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={datasetTitle}
          onChange={(e) => setDatasetTitle(e.target.value)} // Update dataset title
          placeholder="Enter dataset title"
          className="border rounded p-2 mr-2"
        />
        <button onClick={addDataset} className="bg-blue-500 text-white px-4 py-2 rounded">
          <Plus className="inline-block mr-2" /> Add Dataset
        </button>
      </div>

      {/* Datasets List */}
      <div className="mb-4">
        {datasets.map((dataset, index) => (
          <button
            key={index}
            onClick={() => selectDataset(index)}
            className={`mb-2 mr-2 px-4 py-2 rounded ${activeDatasetIndex === index ? 'bg-gray-400' : 'bg-gray-200'}`}
          >
            {dataset.title}
          </button>
        ))}
      </div>

      {activeDatasetIndex !== null && (
        <>
          {/* Table Name Input */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)} // Update new table name
              placeholder="Enter table name"
              className="border rounded p-2 mr-2"
            />
            <button onClick={addTable} className="bg-blue-500 text-white px-4 py-2 rounded">
              <Plus className="inline-block mr-2" /> Add Table
            </button>
          </div>

          {/* Number of Rows Input */}
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={numRows}
              onChange={(e) => setNumRows(Number(e.target.value))} // Update number of rows
              placeholder="Number of rows"
              className="border rounded p-2 mr-2"
            />
            <button 
              onClick={handleGenerateData} 
              className={`bg-green-500 text-white px-4 py-2 rounded ${isLoading ? 'bg-gray-400' : ''} ${error ? 'bg-red-500' : ''}`}
            >
              Generate Synthetic Data
            </button>
          </div>

          {datasets[activeDatasetIndex].tables.map((table, tableIndex) => (
            <div key={tableIndex} className="bg-white shadow rounded-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={table.name}
                  onChange={(e) => handleFieldChange(tableIndex, -1, 'name', e.target.value)}
                  className="text-xl font-semibold"
                />
                <button onClick={() => removeTable(tableIndex)} className="text-red-500">
                  <Trash2 />
                </button>
              </div>

              <button onClick={() => addField(tableIndex)} className={`bg-green-500 text-white ${buttonStyles}`}>
                <Plus className="inline-block mr-1" /> Add Field
              </button>

              {table.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex mb-2">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => handleFieldChange(tableIndex, fieldIndex, 'name', e.target.value)}
                    placeholder="Field Name"
                    className="border rounded p-1 mr-2 flex-1"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(tableIndex, fieldIndex, 'type', e.target.value)}
                    className="border rounded p-1 mr-2"
                  >
                    <option value="String">String</option>
                    <option value="Integer">Integer</option>
                    <option value="Float">Float</option>
                  </select>
                  <select
                    value={field.constraints}
                    onChange={(e) => handleFieldChange(tableIndex, fieldIndex, 'constraints', e.target.value)}
                    className="border rounded p-1 mr-2"
                  >
                    {constraintsOptions.map((constraint) => (
                      <option key={constraint} value={constraint}>
                        {constraint}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeField(tableIndex, fieldIndex)} className="text-red-500">
                    <Trash2 />
                  </button>
                </div>
              ))}

              <button
                onClick={() => toggleShowContents(tableIndex)}
                className={`mt-4 ${buttonStyles}`}
              >
                {table.showContents ? 'Hide' : 'Show'} Contents
              </button>

              {table.showContents && (
                <pre className="bg-gray-100 border rounded p-2 mt-2">
                  {JSON.stringify(table.fields, null, 2)}
                </pre>
              )}
            </div>
          ))}

          {/* JSON Output */}
          <div className="bg-gray-100 p-4 rounded mt-4">
            <h2 className="text-xl font-semibold">JSON Output</h2>
            <pre>{jsonOutput}</pre>
            <button onClick={convertToJson} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Convert to JSON
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetConfig;
