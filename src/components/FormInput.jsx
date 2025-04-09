import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCard } from '../utils/saveCard';
import './FormInput.css';

export default function FormInput() {
  const [form, setForm] = useState({
    name: '',
    job: '',
    email: '',
    phone: '',
    website: '',
    linkedin: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await saveCard(form);
    navigate(`/card?id=${id}`);
  };

  return (
    <div className="form-container">
      <h2>📝 Buat Kartu Nama Digital</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'job', 'email', 'phone', 'website', 'linkedin'].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field === 'name' || field === 'email'}
            />
          </div>
        ))}

        <button type="submit">Simpan dan Generate QR</button>
      </form>
    </div>
  );
}
