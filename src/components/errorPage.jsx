import React from 'react'
import styles from './errorPage.module.css';
function ErrorPage() {
    // создаем массив из 30 капель
    const raindrops = Array.from({ length: 30 }).map((_, index) => (
        <div key={index} className={styles.raindrop} style={{
            left: `${Math.random() * 100}vw`, 
            animationDuration: `${1 + Math.random() * 2}s`, 
            height: `${20 + Math.random() * 30}px` 
        }} />
    ));

    return (
        <div className={styles.errorPage}>
            <div className={styles.rain}>
                {raindrops}
            </div>
            <p className={styles.errorMessage}>Error 404, this page doesn't exist</p>
        </div>
    );
}

export default ErrorPage;
