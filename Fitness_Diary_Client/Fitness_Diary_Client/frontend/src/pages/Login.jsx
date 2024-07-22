import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { useSignIn } from "react-auth-kit";
import { Link } from 'react-router-dom'; // Import Link component

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useStateContext();
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent in the request
    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Perform the POST request to the '/login' endpoint
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the token is returned in the response data
        sessionStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        console.log('Login successful with:', email);
        navigate('/dashboard');
      } else {
        // Handle errors
        if (response.status === 401) {
          window.alert('Incorrect email or password');
        } else if (response.status === 404) {
          window.alert('No user found with the provided email');
        } else {
          window.alert('Unknown error occurred');
        }
      }
    } catch (error) {
      window.alert('There was a problem with the login operation');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button type="submit" 
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>
              <button onClick={goToRegister} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Register
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
