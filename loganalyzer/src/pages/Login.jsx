// Login.jsx
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { login as apiLogin } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiLogin(form);
      login(res.data.token); // Save JWT in context
      alert('Login success 🚀');
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid email or password ❌');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1>🍷 LogAnalyzer</h1>
        <p className="tagline">Analyze logs. Spot issues. Stay calm 💜</p>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <span>📧</span>
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          </div>

          <div className="input-box">
            <span>🔐</span>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          </div>

          <button className="login-btn">Login 🚀</button>
        </form>

        <p className="switch">
          New here? <span onClick={() => navigate('/signup')}>Create account ✨</span>
        </p>
      </div>
    </div>
  );
}
