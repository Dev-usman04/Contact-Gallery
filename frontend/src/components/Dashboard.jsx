import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const Dashboard = ({ user, showAlert }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('https://contact-gallery.vercel.app/api/contacts');
        setContacts(res.data);
      } catch (err) {
        showAlert('Failed to fetch contacts', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, [showAlert]);

  return (
    <div className="animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6 animate-slideInDown">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h2>
            <p className="text-blue-100 mt-2">Manage your contacts with ease</p>
          </div>
          <div className="text-4xl">📱</div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
            <span className="text-sm">Total Contacts</span>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
            <span className="text-sm">Recent</span>
            <div className="text-2xl font-bold">
              {contacts.length > 0 ? formatDate(contacts[0]?.createdAt) : 'None'}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your contacts...</p>
          </div>
        </div>
      ) : (
        <>
          <ContactForm setContacts={setContacts} showAlert={showAlert} />
          <ContactList contacts={contacts} setContacts={setContacts} showAlert={showAlert} />
        </>
      )}
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return 'None';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

export default Dashboard;