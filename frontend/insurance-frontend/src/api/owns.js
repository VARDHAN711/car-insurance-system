import axios from 'axios';

const API_URL = 'http://localhost:3001/api/owns';

export const getAllOwns = () => axios.get(API_URL);
export const addOwn = (data) => axios.post(API_URL, data);
export const deleteOwn = (driver_id, regno) => axios.delete(`${API_URL}/${driver_id}/${regno}`);
