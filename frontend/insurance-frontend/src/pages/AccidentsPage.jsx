import React, { useEffect, useState } from 'react';
import { getAllAccidents, addAccident, deleteAccident } from '../api/accidents';

function AccidentsPage() {
  const [accidents, setAccidents] = useState([]);
  const [formData, setFormData] = useState({
    report_number: '',
    date: '',
    location: '',
  });

  const fetchAccidents = async () => {
    try {
      const res = await getAllAccidents();
      setAccidents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccidents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAccident(formData);
      fetchAccidents();
      setFormData({ report_number: '', date: '', location: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (reportNumber) => {
    try {
      await deleteAccident(reportNumber);
      fetchAccidents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Accidents</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="report_number"
          placeholder="Report Number"
          value={formData.report_number}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Accident</button>
      </form>

      <ul>
        {accidents.map((acc) => (
          <li key={acc.report_number}>
            {acc.report_number} - {acc.date} ({acc.location})
            <button onClick={() => handleDelete(acc.report_number)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccidentsPage;
