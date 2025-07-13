import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Alert from './components/Alert';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['x-auth-token'] = token;
          const res = await axios.get('/api/auth');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} setAuthToken={setAuthToken} />
        <div className="container mx-auto px-4 py-8">
          {alert && <Alert alert={alert} />}
          <Routes>
            <Route path="/register" element={
              !isAuthenticated ? <Register setAuthToken={setAuthToken} showAlert={showAlert} /> : <Navigate to="/dashboard" />
            } />
            <Route path="/login" element={
              !isAuthenticated ? <Login setAuthToken={setAuthToken} showAlert={showAlert} /> : <Navigate to="/dashboard" />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard user={user} showAlert={showAlert} /> : <Navigate to="/login" />
            } />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;