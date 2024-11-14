import React, { useEffect, useState } from 'react';
import Word from './Word';
import LoadingIndicator from './LoadingIndicator';
import styles from './randomWord.module.css';

function RandomWord() {
    const [randomWord, setRandomWord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRussian, setShowRussian] = useState(false); // Состояние для отображения перевода

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

    const handleCheck = () => {
        setShowRussian(true); // показываем перевод
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <div className={styles.randomWordContainer}>
            <p>Слово дня!</p>
            <p>New day - new word</p>
            {randomWord && (
                <div className='wordCard'>
                <Word 
                    key={randomWord.id} 
                    english={randomWord.english} 
                    russian={showRussian ? randomWord.russian : (
                        <button onClick={handleCheck} className={styles.handleCheck}>Проверить</button>
                    )} 
                    transcription={<span className={styles.wordTranscR}>{randomWord.transcription}</span>} 
                    tags={randomWord.tags} 
                    showButtons={false}  
                    customClass={styles.randomWordTable} 
                    noBorder={true} 
                />
                </div>
            )}
            <p>Запомни его!</p>
        </div>
    );
}

export default RandomWord;

