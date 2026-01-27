import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../api';

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup({
        name: username,   // backend still receives "name"
        email,
        password
      });

      alert("Signup successful 🎉");
      navigate('/');
    } catch (err) {
      alert("Signup failed ❌");
      console.error(err);
    }
  };

  return (
    <div className="signup-wrap">
      <div className="signup-card">
        <h1>✨ Join LogAnalyzer</h1>

        <form onSubmit={handleSignup}>
          <div className="input-box">
            <span>👤</span>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box">
            <span>📧</span>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <span>🔐</span>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signup-btn">Sign Up 🎉</button>
        </form>

        <p className="switch">
          Already have an account?{' '}
          <span onClick={() => navigate('/')}>
            Login here 🔐
          </span>
        </p>
      </div>
    </div>
  );
}
