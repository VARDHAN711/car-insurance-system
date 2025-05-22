import { useState } from 'react';
import { updateDamageAmount } from '../api/participated';

function UpdateDamagePage() {
  const [formData, setFormData] = useState({
    driver_id: '',
    Regno: '',
    report_number: '',
    damage_amount: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDamageAmount(formData);
      setMessage('Damage amount updated successfully.');
    } catch (error) {
      setMessage('Error updating damage amount.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Update Damage Amount</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="driver_id" placeholder="Driver ID" onChange={handleChange} required />
        <input name="Regno" placeholder="Reg. No" onChange={handleChange} required />
        <input name="report_number" placeholder="Report Number" type="number" onChange={handleChange} required />
        <input name="damage_amount" placeholder="New Damage Amount" type="number" onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateDamagePage;
