import axios from "axios";

const API_URL = "http://localhost:5000/properties";
const getProperties = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const getProperty = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

const createProperty = async (property) => {
    const response = await axios.post(API_URL, property);
    return response.data;
}

const updateProperty = async (id, property) => {
    const response = await axios.put(`${API_URL}/${id}`, property);
    return response.data;
}

const deleteProperty = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

export { getProperties, getProperty, createProperty, updateProperty, deleteProperty };