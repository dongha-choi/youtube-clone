import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    navigate(`/videos/${text}`);
  };
  const handleChange = (e) => setText(e.target.value);
  return (
    <div>
      <Link to='/'>Logo</Link>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          placeholder='Search...'
          onChange={handleChange}
        />
        <button>🔍</button>
      </form>
    </div>
  );
}
