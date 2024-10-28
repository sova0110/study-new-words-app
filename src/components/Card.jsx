import React, { useState, useEffect, useRef } from 'react';
import styles from './card.module.css'

function Card(props) {
    const checkButtonRef = useRef(null);

    useEffect(() => {
        if (checkButtonRef.current && props.showCheckButton) {
            checkButtonRef.current.focus(); //  фокус на кнопку при отображении
        }
    }, [props.showCheckButton]);

    return (
        <div className={styles.card}>
            <p className={styles.wordTitle}>{props.english}</p>
            <p className={styles.wordText}>{props.russian}</p>
            <p className={styles.wordTransc}>{props.transcription}</p>
            {props.showCheckButton && (
                <button 
                    ref={checkButtonRef} 
                    onClick={() => {
                        props.handleCheck(); 
                        props.incrementLearned(props.id); // передаем ID слова для увеличения счетчика
                    }} 
                    className={styles.handleCheck}
                >
                    Проверить
                </button>
            )}
        </div>
    );
}

export default Card
