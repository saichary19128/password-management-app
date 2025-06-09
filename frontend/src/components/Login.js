import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={form.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
        </Form.Group>
        <Button className="mt-3" type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
