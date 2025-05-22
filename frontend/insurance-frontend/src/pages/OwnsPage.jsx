import React, { useEffect, useState } from 'react';
import { getAllOwns, addOwn, deleteOwn } from '../api/owns';
import { getAllPersons } from '../api/persons';
import { getAllCars } from '../api/cars';

function OwnsPage() {
  const [owns, setOwns] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    driver_id: '',
    regno: '',
  });

  const fetchData = async () => {
    try {
      const [ownsRes, driversRes, carsRes] = await Promise.all([
        getAllOwns(),
        getAllPersons(),
        getAllCars(),
      ]);
      setOwns(ownsRes.data);
      setDrivers(driversRes.data);
      setCars(carsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOwn(formData);
      fetchData();
      setFormData({ driver_id: '', regno: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (driver_id, regno) => {
    try {
      await deleteOwn(driver_id, regno);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Ownerships</h2>
      <form onSubmit={handleSubmit}>
        <select name="driver_id" value={formData.driver_id} onChange={handleChange} required>
          <option value="">Select Driver</option>
          {drivers.map((d) => (
            <option key={d.driver_id} value={d.driver_id}>
              {d.driver_id} - {d.name}
            </option>
          ))}
        </select>

        <select name="regno" value={formData.regno} onChange={handleChange} required>
          <option value="">Select Car</option>
          {cars.map((c) => (
            <option key={c.regno} value={c.regno}>
              {c.regno} - {c.model}
            </option>
          ))}
        </select>

        <button type="submit">Add Ownership</button>
      </form>

      <ul>
        {owns.map((o, idx) => (
          <li key={idx}>
            Driver: {o.driver_id} - Car: {o.regno}
            <button onClick={() => handleDelete(o.driver_id, o.regno)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnsPage;
