import React from 'react';
import styles from './header.module.css';


function Header() {
    const User = true;
    return (
        <div className={styles.header}>
            <div className={styles.logoImg}>
                <img className="logo--header" src="https://cdn.icon-icons.com/icons2/1408/PNG/256/books_97178.png" alt="logo--header" />
                <p>NewWords!</p>
            </div>
            {User ? (
                <button className={styles.Logout} >Выйти</button>
            ) : (
                <>
                    <button className={styles.Login} >Войти</button>
                    <button className={styles.Signup} >Регистрация</button>
                </>
            )}
        </div>
    );
}

export default Header;