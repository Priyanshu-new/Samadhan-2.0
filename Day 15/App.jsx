import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {isLoggedIn ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;
