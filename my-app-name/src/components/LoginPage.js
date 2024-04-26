import React, { useState } from 'react';

function LoginPage({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isRegistering ? '/register' : '/login';
    const response = await fetch(`http://localhost:5000${endpoint}`, { // Ensure URL matches your Flask server address
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      onLoginSuccess();
    } else {
      const error = await response.text();
      console.error('Failed to log in:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <form className="bg-gray-800 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">{isRegistering ? 'Register' : 'Log In'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input mt-1 block w-full rounded-md bg-gray-800 border-gray-600 p-4 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input mt-1 block w-full rounded-md bg-gray-800 border-gray-600 p-4 mb-4"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
        >
          {isRegistering ? 'Register' : 'Log In'}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 text-sm text-gray-400"
        >
          {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

