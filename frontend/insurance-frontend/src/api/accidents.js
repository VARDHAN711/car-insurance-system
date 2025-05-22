import axios from 'axios';

const API_URL = 'http://localhost:3001/api/accidents';

export const getAllAccidents = () => axios.get(API_URL);
export const addAccident = (accident) => axios.post(API_URL, accident);
export const deleteAccident = (reportNumber) => axios.delete(`${API_URL}/${reportNumber}`);
