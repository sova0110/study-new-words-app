import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';


function Header() {
    const User = true;
    return (
        <div className={styles.header}>
            <Link to="/" className={styles.navLink}>
                <div className={styles.logoImg}>
                    <img className="logo--header" src="https://cdn.icon-icons.com/icons2/1408/PNG/256/books_97178.png" alt="logo--header" />
                    <p>NewWords!</p>
                </div>
            </Link>
            <Link to="/" className={styles.navLink}>Главная</Link>
            <Link to="/cards" className={styles.navLink}>Карточки</Link>
            <Link to="/random_card" className={styles.navLink}>слово дня</Link>
            {User ? (
                <button className={styles.Logout}>Выйти</button>
            ) : (
                <>
                    <button className={styles.Login}>Войти</button>
                    <button className={styles.Signup}>Регистрация</button>
                </>
            )}
        </div>
    );
}

export default Header;