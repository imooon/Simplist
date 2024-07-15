import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Simplist from './components/Simplist';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // Token validation check here
  }, [token]);

  return (
    <div>
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <div>
          <h1>Welcome to the app!</h1>
          <button onClick={() => {
            setToken('');
            localStorage.removeItem('token');
          }}>Logout</button>
          <Simplist token={token} />
        </div>
      )}
    </div>
  );
};

export default App;
