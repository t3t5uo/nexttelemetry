
// utils/fetchFromAirtable.js
import axios from 'axios';

const fetchFromAirtable = async () => {
  const endpoint = 'https://airtable.com/appRnWaGS8CqUWMqV/tblMP4eKI5QW9iWhM/viwRnyFlxZTEn0lph';
  const apiKey = process.env.AIRTABLE_API_KEY; // Store your API key in an environment variable

  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    return response.data.records;
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return [];
  }
};

export default fetchFromAirtable;
