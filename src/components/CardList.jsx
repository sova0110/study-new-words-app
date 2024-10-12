import React, { useEffect, useState } from 'react';
import Card from './Card';
import styles from './cardList.module.css';

const CardList = () => {
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showRussian, setShowRussian] = useState(false);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                const data = await response.json();
                setWords(data);
                setLoading(false);
            } catch (error) {
                console.error('ошибка данных:', error);
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

    return (
        <div className={styles.slider}>
            {loading ? (
                <p>Груууузиииим</p>
            ) : (
                <div className={styles.cardContainer}>
                    <button onClick={prevCard} className={styles.arrow}>←</button>
                    <Card 
                        english={words[currentIndex].english} 
                        russian={showRussian ? words[currentIndex].russian : (
                            <button onClick={handleCheck} className={styles.handleCheck}>Проверить</button>
                        )}  
                        transcription={words[currentIndex].transcription} 
                        tags={words[currentIndex].tags} 
                    />
                    <button onClick={nextCard} className={styles.arrow}>→</button>
                </div>
            )}
            <div className={styles.cardCounter}>
                {`${currentIndex + 1} / ${words.length}`}
            </div>
        </div>
    );
};

export default CardList;