import React, { useState } from 'react';
import axios from 'axios';

const ContactList = ({ contacts, setContacts, showAlert }) => {
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleEdit = (contact) => {
    setEditing(contact._id);
    setFormData({ name: contact.name, email: contact.email, phone: contact.phone });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`https://contact-gallery.vercel.app/api/contacts/${id}`, formData);
      setContacts(contacts.map((contact) => (contact._id === id ? res.data : contact)));
      setEditing(null);
      setFormData({ name: '', email: '', phone: '' });
      showAlert('Contact updated', 'success');
    } catch (err) {
      showAlert(err.response.data.msg || 'Failed to update contact', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      showAlert('Contact deleted', 'success');
    } catch (err) {
      showAlert(err.response.data.msg || 'Failed to delete contact', 'error');
    }
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-bold mb-4 animate-slideInDown">Your Contacts</h3>
      {contacts.length === 0 ? (
        <div className="text-center py-8 animate-bounce">
          <div className="text-gray-400 text-6xl mb-4">📞</div>
          <p className="text-gray-600 text-lg">No contacts found.</p>
          <p className="text-gray-500 text-sm mt-2">Add your first contact above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact, index) => (
            <div 
              key={contact._id} 
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {editing === contact._id ? (
                <div className="space-y-3 animate-fadeIn">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    className="w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    className="w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(contact._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-800">{contact.name}</h4>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 flex items-center">
                      <span className="mr-2">📧</span>
                      {contact.email}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="mr-2">📱</span>
                      {contact.phone}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center">
                      <span className="mr-1">🕒</span>
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;