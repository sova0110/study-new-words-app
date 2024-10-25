import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import styles from './cardList.module.css';

const CardList = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showRussian, setShowRussian] = useState(false);
    const [learnedCount, setLearnedCount] = useState(0); 
    const checkButtonRef = useRef(null); 

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

    const incrementLearned = () => {
        setLearnedCount((prevCount) => prevCount + 1); 
    };

    useEffect(() => {
        if (checkButtonRef.current && !showRussian) {
            checkButtonRef.current.focus();
        }
    }, [currentIndex]); 

    return (
        <div className={styles.slider}>
            {loading ? (
                <p>Груууузиииим</p>
            ) : (
                <div className={styles.cardContainer}>
                    <button onClick={prevCard} className={styles.arrow}>←</button>
                    <Card 
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