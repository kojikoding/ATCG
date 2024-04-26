import React, { useState } from 'react';
import './index.css'; // Ensure this imports Tailwind CSS
import HomePage from './components/homePage';
import LoginPage from './components/LoginPage';
import TestCaseGeneratorPage from './components/testCaseGenerator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('testGenerator');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  let content;
  switch (currentPage) {
    case 'home':
      content = <HomePage onGetStarted={() => setCurrentPage('login')} />;
      break;
    case 'login':
      content = <LoginPage onLoginSuccess={onLoginSuccess} />;
      break;
    case 'testGenerator':
      if (isLoggedIn) {
        content = <TestCaseGeneratorPage onLogout={handleLogout} />;
      } else {
        setCurrentPage('login'); // Redirect to login if not authenticated
      }
      break;
    default:
      content = <div>Page not found</div>;
  }

  return <div className="bg-gray-900 text-white min-h-screen">{content}</div>;
}

export default App;





