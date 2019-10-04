import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav({user, game, handleLogout}) {
  let nav = null;
  if (user) {
    nav = <div><Link to='' onClick={handleLogout}>Log Out</Link></div>
  } else {
    nav = <div><Link to='/signup'>Sign Up</Link> | <Link to='/login'>Log In</Link></div>;
  }
  return (
    <header className={styles.header}>
      <div>React + socket.io Tic-Tac-Toe</div>
      { nav }
    </header>
  );
}

export default Nav;