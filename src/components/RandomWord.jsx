import React, { useEffect, useState } from "react";
import Word from './Word';
import styles from './randomWord.module.css';
import wordStore from '../store/wordStore';
import { observer } from 'mobx-react';

const RandomWord = observer(() => {
    const [randomWord, setRandomWord] = useState(null);
    const [showRussian, setShowRussian] = useState(false); // Состояние для отображения перевода

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Проверка структуры данных
                console.log('Fetched words:', data);

                // Добавляем слова в wordStore
                data.forEach(word => wordStore.addWord(word));

                // Устанавливаем случайное слово из полученных данных
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomWord(data[randomIndex] || null); // Убедитесь, что randomWord не null
            } catch (error) {
                console.error('Error fetching words:', error);
            }
        };

        fetchWords();
    }, []);

    const handleCheck = () => {
        setShowRussian(true); // Показываем перевод
    };

    return (
        <div className={styles.randomWordContainer}>
            <p>Слово дня!</p>
            <p>New day - new word</p>
            {randomWord ? (
                <div className='wordCard'>
                    <Word 
                        key={randomWord.id} 
                        english={randomWord.english || "Неизвестно"} 
                        russian={showRussian ? randomWord.russian || "Неизвестно" : (
                            <button onClick={handleCheck} className={styles.handleCheck}>Проверить</button>
                        )} 
                        transcription={<span className={styles.wordTranscR}>{randomWord.transcription || "Неизвестно"}</span>} 
                        tags={randomWord.tags || []} // Используйте пустой массив, если tags отсутствуют
                        showButtons={false}  
                        customClass={styles.randomWordTable} 
                        noBorder={true} 
                    />
                </div>
            ) : (
                <div>Груууузим</div>
            )}
            <p>Запомни его!</p>
        </div>
    );
});

export default RandomWord;

