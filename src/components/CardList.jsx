import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import LoadingIndicator from './LoadingIndicator';
import styles from './cardList.module.css';

const CardList = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showRussian, setShowRussian] = useState(false);
    const [learnedCount, setLearnedCount] = useState(0);
    const [learnedWords, setLearnedWords] = useState(new Set()); // состояние по id карточки слова, что бы счетчик увеличивался за сессия только одинтраз при клике на кнопку

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                const data = await response.json();
                setWords(data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка данных:', error);
            }
        };

        fetchWords();
    }, []);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setShowRussian(false);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
        setShowRussian(false);
    };

    const handleCheck = () => {
        setShowRussian(true);
    };

    const incrementLearned = (id) => {
        if (!learnedWords.has(id)) { 
            setLearnedCount((prevCount) => prevCount + 1);
            setLearnedWords((prevLearned) => new Set(prevLearned).add(id)); 
        }
    };

    return (
        <div className={styles.slider}>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className={styles.cardContainer}>
                    <button onClick={prevCard} className={styles.arrow}>←</button>
                    <Card 
                        id={words[currentIndex].id} 
                        english={words[currentIndex].english} 
                        russian={showRussian ? words[currentIndex].russian : ''}
                        transcription={words[currentIndex].transcription} 
                        showCheckButton={!showRussian}
                        handleCheck={handleCheck} 
                        incrementLearned={incrementLearned} 
                    />
                    <button onClick={nextCard} className={styles.arrow}>→</button>
                </div>
            )}
            <div className={styles.cardCounter}>
                {`${currentIndex + 1} / ${words.length}`}
            </div>
            <div className={styles.learnedCount}>
                {`Изучено слов: ${learnedCount}`}
            </div>
        </div>
    );
};

    

export default CardList;