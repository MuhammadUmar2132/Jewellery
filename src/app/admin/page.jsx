"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // Ensure default admin credentials exist in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('adminCreds');
      if (!stored) {
        const defaultCreds = { username: 'admin', password: 'admin123' };
        localStorage.setItem('adminCreds', JSON.stringify(defaultCreds));
      }

      const session = localStorage.getItem('isAdminLoggedIn');
      if (session === 'true') {
        setLoggedIn(true);
        router.push('/dashboard'); // redirect if already logged in
      }
    } catch (err) {
      console.warn('localStorage unavailable', err);
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const stored = JSON.parse(localStorage.getItem('adminCreds') || '{}');
      if (username === stored.username && password === stored.password) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        setLoggedIn(true);
        setError('');
        router.push('/dashboard'); // ✅ Redirect to dashboard
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed — unable to access stored credentials.');
    }
  };

  const LoginForm = () => (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        margin: '48px auto',
        padding: 24,
        borderRadius: 8,
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
      }}
    >
      <h2 style={{ marginBottom: 8 }}>Admin Login</h2>

      <label style={{ display: 'block', marginBottom: 8 }}>
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            marginTop: 6,
            borderRadius: 6,
            border: '1px solid #ddd'
          }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            marginTop: 6,
            borderRadius: 6,
            border: '1px solid #ddd'
          }}
        />
      </label>

      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>Login</button>
        <button
          type="button"
          onClick={() => {
            setUsername('admin');
            setPassword('admin123');
          }}
          style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}
        >
          Fill admin creds
        </button>
      </div>

      <small style={{ display: 'block', marginTop: 12, color: '#666' }}>
        Note: Default admin credentials are <strong>admin</strong> / <strong>admin123</strong>
      </small>
    </form>
  );

  return <div>{!loggedIn && <LoginForm />}</div>;
};

export default Page;
