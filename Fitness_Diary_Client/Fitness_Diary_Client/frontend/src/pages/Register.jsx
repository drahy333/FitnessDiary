import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert('Passwords do not match.');
      return;
    }

    const registrationData = {
      email: email,
      password: password,
      gender: gender,
      weight: weight,
      height: height,
      age: age,
    };

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        window.alert('Registration successful. You can now log in.');
        navigate('/login');
      } else {
        window.alert('Registration failed');
      }
    } catch (error) {
      console.error('There was a problem with the registration operation:', error);
      window.alert('There was a problem with the registration operation');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register your account</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input type="email" placeholder="Email" 
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block">Password</label>
            <input type="password" placeholder="Password" 
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" 
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
          </div>
          <div className="mt-4">
            <label htmlFor="gender" className="block">Gender</label>
            <select
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="weight" className="block">Weight (kg)</label>
            <input type="number" placeholder="Weight in kg"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required />
          </div>
          <div className="mt-4">
            <label htmlFor="height" className="block">Height (cm)</label>
            <input type="number" placeholder="Height in cm"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required />
          </div>
          <div className="mt-4">
            <label htmlFor="age" className="block">Age</label>
            <input type="number" placeholder="Age"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
