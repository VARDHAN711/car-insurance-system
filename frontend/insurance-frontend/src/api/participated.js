import axios from 'axios';

const API_URL = 'http://localhost:3001/api/participated';

export const getAllParticipated = () => axios.get(API_URL);
export const addParticipation = (data) => axios.post(API_URL, data);
export const deleteParticipation = (driver_id, regno, report_number) =>
    axios.delete(`${API_URL}/${driver_id}/${regno}/${report_number}`);
