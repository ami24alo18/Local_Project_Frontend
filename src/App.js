// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { useAuth, AuthProvider } from './AuthContext';
import axios from 'axios';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const App = () => {
  const [customers, setCustomers] = useState([]);
  const { isAuthenticated, logout } = useAuth();

  const addCustomer = async (customer) => {
    setCustomers([...customers, { id: Date.now(), ...customer }]);

    try {
      const response = await axios.post('http://localhost:1995/addCustomer', {
        name: customer.name,
        email: customer.email,
        mobileNo: customer.mobileNo,
        aadhaarNo: customer.aadhaarNo,
        roomNo: customer.roomNo
      });
      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error saving customer data: ', error);
      return false;
    }
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  return (
    <AppContainer>
      <Title>Hotel Management</Title>
      {isAuthenticated && <LogoutButton onClick={logout}>Logout</LogoutButton>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <CustomerForm addCustomer={addCustomer} />
                <CustomerList customers={customers} updateCustomer={updateCustomer} />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContainer>
  );
};

const WrappedApp = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default WrappedApp;
