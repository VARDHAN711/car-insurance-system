import React, { useEffect, useState } from 'react';
import {
  getAllParticipated,
  addParticipation,
  deleteParticipation,
} from '../api/participated';
import { getAllPersons } from '../api/persons';
import { getAllCars } from '../api/cars';
import { getAllAccidents } from '../api/accidents';

function ParticipatedPage() {
  const [participations, setParticipations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [formData, setFormData] = useState({
    driver_id: '',
    Regno: '',
    report_number: '',
    damage_amount: '',
  });

  const fetchData = async () => {
    try {
      const [p, d, c, a] = await Promise.all([
        getAllParticipated(),
        getAllPersons(),
        getAllCars(),
        getAllAccidents(),
      ]);
      setParticipations(p.data);
      setDrivers(d.data);
      setCars(c.data);
      setAccidents(a.data);
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
      await addParticipation(formData);
      fetchData();
      setFormData({ driver_id: '', Regno: '', report_number: '', damage_amount: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (driver_id, regno, report_number) => {
    try {
      await deleteParticipation(driver_id, regno, report_number);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Accident Participation</h2>
      <form onSubmit={handleSubmit}>
        <select name="driver_id" value={formData.driver_id} onChange={handleChange} required>
          <option value="">Select Driver</option>
          {drivers.map((d) => (
            <option key={d.DRIVER_ID} value={d.DRIVER_ID}>
              {d.DRIVER_ID} - {d.name}
            </option>
          ))}
        </select>

        <select name="Regno" value={formData.Regno} onChange={handleChange} required>
          <option value="">Select Car</option>
          {cars.map((c) => (
            <option key={c.Regno} value={c.Regno}>
              {c.Regno} - {c.model}
            </option>
          ))}
        </select>

        <select name="report_number" value={formData.report_number} onChange={handleChange} required>
          <option value="">Select Accident</option>
          {accidents.map((a) => (
            <option key={a.report_number} value={a.report_number}>
              {a.report_number} - {a.location}
            </option>
          ))}
        </select>

        <input
          name="damage_amount"
          placeholder="Damage Amount"
          type="number"
          value={formData.damage_amount}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Participation</button>
      </form>

      <ul>
        {participations.map((p, i) => (
          <li key={i}>
            Driver: {p.driver_id} | Car: {p.Regno} | Accident: {p.report_number} | Damage: ₹{p.damage_amount}
            <button onClick={() => handleDelete(p.driver_id, p.Regno, p.report_number)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipatedPage;