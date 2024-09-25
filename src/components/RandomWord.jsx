import React, { useEffect, useState } from 'react';
import Word from './Word';
import styles from './randomWord.module.css'

function RandomWord() {
    const [randomWord, setRandomWord] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRandomWord = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                const data = await response.json();
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomWord(data[randomIndex]);
            } catch (error) {
                console.error('что-то пошло не так:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomWord();
    }, []);

    if (loading) {
        return <div>Груууузим</div>;
    }

    return (
        <div className={styles.wordTable}>
            <p>Слово дня!</p>
            <p>New day - new word</p>
            {randomWord && (
    <Word 
        key={randomWord.id} 
        english={randomWord.english} 
        russian={randomWord.russian} 
        transcription={randomWord.transcription} 
        tags={randomWord.tags} 
        showButtons={false}  
    />
)}
            <p>Запомни его!</p>
        </div>
    );
}

export default RandomWord