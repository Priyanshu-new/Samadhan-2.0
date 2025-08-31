import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Swagat hai, {user}!</h1>
        <p className="text-gray-600 mb-6">You have successfully accessed the protected dashboard.</p>
        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
