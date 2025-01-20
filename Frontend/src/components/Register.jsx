import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <h2>Register</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <button 
        type="submit"
        style={{
          width: '100%',
          padding: '0.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
    </form>
  );
}

export default Register; 