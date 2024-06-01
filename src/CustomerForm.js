// src/CustomerForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CustomerForm = ({ addCustomer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer({ name, email, mobileNo });
    setName('');
    setEmail('');
    setMobileNo('');
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="MobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
        <Button type="submit">Add Customer</Button>
      </form>
    </FormContainer>
  );
};

export default CustomerForm;
