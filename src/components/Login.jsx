import React from 'react';
import styles from './logIn.module.css';

function LogIn({ onClose }) {
    return (
        <div className={styles.formContainer}>
            <h2>Registration Form</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" required />
                </label>
                <label>
                    Пароль:
                    <input type="password" name="password" required />
                </label>
                <label>
                    Подтвердить пароль:
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}

export default LogIn;