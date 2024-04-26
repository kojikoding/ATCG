// HomePage.js
import React from 'react';

const HomePage = ({ onGetStarted }) => (
  <header className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-6">Welcome to the Automated Test Case Generator</h1>
    <button
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
      onClick={onGetStarted}
    >
      Get Started
    </button>
  </header>
);

export default HomePage;
