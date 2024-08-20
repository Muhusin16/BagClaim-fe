"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './register.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: 'http://localhost:5002/api/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ username, email, password }), 
      });
  
      if (response.status === 200) {
        alert('User registered successfully');
        router.push('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };
  
  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
        className={styles.inputBox} 
      /> 
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className={styles.inputBox} 
      /> 
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        className={styles.inputBox} 
      /> 
      <button type="submit" className={styles.btn}>Register</button>
    </form>
  );
};

export default Register;
