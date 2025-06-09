import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';

const Dashboard = () => {
  const [form, setForm] = useState({ account: '', password: '' });
  const [passwords, setPasswords] = useState([]);
  const token = localStorage.getItem('token');

  const fetchPasswords = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/passwords', {
        headers: { 'x-auth-token': token },
      });
      setPasswords(res.data);
    } catch (err) {
      alert('Failed to fetch passwords');
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/passwords', form, {
        headers: { 'x-auth-token': token },
      });
      setForm({ account: '', password: '' });
      fetchPasswords();
    } catch (err) {
      alert('Add failed');
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/passwords/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchPasswords();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <Container className="mt-5">
      <h3>Password Manager</h3>
      <Form onSubmit={handleAdd}>
        <Form.Group>
          <Form.Label>Account</Form.Label>
          <Form.Control name="account" value={form.account} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" value={form.password} onChange={handleChange} required />
        </Form.Group>
        <Button className="mt-3" type="submit">Add</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Account</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((item) => (
            <tr key={item._id}>
              <td>{item.account}</td>
              <td>{item.password}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
