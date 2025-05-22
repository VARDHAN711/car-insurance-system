import axios from 'axios';

const API_URL = 'http://localhost:3001/api/cars';

export const getAllCars = () => axios.get(API_URL);
export const addCar = (car) => axios.post(API_URL, car);
export const deleteCar = (regno) => axios.delete(`${API_URL}/${regno}`);
