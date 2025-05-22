import axios from 'axios';

const API_URL = 'http://localhost:3001/api/persons';

export const getAllPersons = () => axios.get(API_URL);
export const addPerson = (person) => axios.post(API_URL, person);
export const deletePerson = (driver_id) => axios.delete(`${API_URL}/${String(driver_id)}`);
