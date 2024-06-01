// src/CustomerList.js
import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CustomerList = ({ customers, updateCustomer }) => {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const startEditing = (customer) => {
    setEditingId(customer.id);
    setName(customer.name);
    setEmail(customer.email);
    setMobileNo(customer.mobileNo);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateCustomer({ id: editingId, name, email, mobileNo });
    setEditingId(null);
    setName('');
    setEmail('');
    setMobileNo('');
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Mobile No</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              {editingId === customer.id ? (
                <>
                  <Td>
                    <form onSubmit={handleUpdate}>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </form>
                  </Td>
                  <Td>
                    <form onSubmit={handleUpdate}>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </form>
                  </Td>
                  <Td>
                    <form onSubmit={handleUpdate}>
                      <Input
                        type="tel"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                      />
                    </form>
                  </Td>
                  <Td>
                    <Button onClick={handleUpdate}>Update</Button>
                  </Td>
                </>
              ) : (
                <>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.mobileNo}</Td>
                  <Td>
                    <Button onClick={() => startEditing(customer)}>Edit</Button>
                  </Td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
