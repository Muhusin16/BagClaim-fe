import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Login</button>
    </form>
  );
};

export default Login;
