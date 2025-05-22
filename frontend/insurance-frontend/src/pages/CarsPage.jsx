import React, { useEffect, useState } from 'react';
import { getAllCars, addCar, deleteCar } from '../api/cars';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    Regno: '',
    model: '',
    year: '',
  });

  const fetchCars = async () => {
    try {
      const res = await getAllCars();
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(formData);
      fetchCars();
      setFormData({ Regno: '', model: '', year: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (regno) => {
    try {
      await deleteCar(regno);
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cars</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="Regno"
          placeholder="Reg No"
          value={formData.Regno}
          onChange={handleChange}
          required
        />
        <input
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          name="year"
          placeholder="Year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Car</button>
      </form>

      <ul>
        {cars.map((car) => (
          <li key={car.Regno}>
            {car.Regno} - {car.model} ({car.year})
            <button onClick={() => handleDelete(car.Regno)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarsPage;
