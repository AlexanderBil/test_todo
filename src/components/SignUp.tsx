import React, { useState } from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { signUpHandler, user } = useAuth();
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
      await signUpHandler(formData.email, formData.password);
      // navigate('/')
    } catch (e) {
      console.log('error', e);
    }
  };

 
  return (
    <div>
      <h2>Sign Up</h2>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
