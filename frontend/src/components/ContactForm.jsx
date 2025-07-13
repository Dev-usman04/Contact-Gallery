import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ setContacts, showAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, email, phone } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('https://contact-gallery.vercel.app/api/contacts', { name, email, phone });
      setContacts((prev) => [res.data, ...prev]);
      setFormData({ name: '', email: '', phone: '' });
      showAlert('Contact added successfully! 🎉', 'success');
    } catch (err) {
      showAlert(err.response.data.msg || 'Failed to add contact', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 animate-slideInDown card-hover">
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-3">👤</div>
        <h3 className="text-xl font-bold text-gray-800">Add New Contact</h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg form-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg form-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg form-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter phone number"
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
              Adding Contact...
            </>
          ) : (
            <>
              <span className="mr-2">➕</span>
              Add Contact
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;