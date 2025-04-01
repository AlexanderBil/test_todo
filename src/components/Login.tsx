import React, { useState } from 'react';
import { useAuth } from '../context/Auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginHandler } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginHandler(formData.email, formData.password);
      navigate('/')
    } catch (e) {
      console.log('error', e);
    }
  };

  
  return (
    <div>
      <h2>Login</h2>
      <form style={{ marginTop: '50px' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Password</label>
          <input
            type="text"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <div>
        Need an account? <Link to='/signup'>Sing up</Link>
      </div>
    </div>
  );
};

export default Login;
