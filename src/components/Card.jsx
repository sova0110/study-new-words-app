import React, { useState, useEffect } from 'react';
import styles from './card.module.css'

function Card(props) {
    return (
        <div className={styles.card}>
            <p className={styles.wordTitle}>{props.english}</p>
            <p className={styles.wordText}>{props.russian}</p>
            <p className={styles.wordTransc}>{props.transcription}</p>
            
                        
        </div>
    );
}

export default Card;