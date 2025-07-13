import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuthToken, showAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setAuthToken(res.data.token);
      showAlert('Welcome back! 🎉', 'success');
      navigate('/dashboard');
    } catch (err) {
      showAlert(err.response.data.msg || 'Login failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl animate-scaleIn card-hover">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">🔐</div>
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg form-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg form-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 btn-animate disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Signing In...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Sign In
            </>
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;