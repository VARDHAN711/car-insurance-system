import React, { useEffect, useState } from 'react';
import { getAllPersons, addPerson, deletePerson } from '../api/persons';

function PersonsPage() {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({
    driver_id: '',
    name: '',
    address: '',
  });

  const fetchPersons = async () => {
    try {
      const res = await getAllPersons();
      setPersons(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPerson(formData);
      fetchPersons();
      setFormData({ driver_id: '', name: '', address: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (driver_id) => {
    try {
      await deletePerson(driver_id);
      fetchPersons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Persons</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="driver_id"
          placeholder="Driver ID"
          value={formData.driver_id}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Person</button>
      </form>

      <ul>
        {persons.map((p) => (
          <li key={p.driver_id}>
            {p.driver_id} - {p.name} ({p.address})
            <button onClick={() => handleDelete(p.driver_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonsPage;
