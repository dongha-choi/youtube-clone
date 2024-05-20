import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FaYoutube } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';

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
      <div className={styles.navbar}>
        <Link to='/' className={styles.logo}>
          <FaYoutube className={styles.icon} />
          <span>YouTube</span>
        </Link>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type='text'
            value={text}
            placeholder='Search...'
            onChange={handleChange}
            className={styles.input}
          />
          <button className={styles.button}>
            <IoIosSearch />
          </button>
        </form>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
