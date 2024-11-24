import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import LoadingIndicator from './LoadingIndicator';
import styles from './cardList.module.css';
import { observer } from 'mobx-react';
import cardStore from '../store/cardStore';

const RandomCard = observer(() => {
    const [randomWord, setRandomWord] = useState(null);

    const fetchRandomWord = async () => {
        await cardStore.fetchWords(); 
        const word = cardStore.getRandomWord(); 
        setRandomWord(word); 
    };

    const handleCheck = () => {
        cardStore.handleCheck(); 
    };

    useEffect(() => {
        fetchRandomWord(); 
    }, []);

    if (cardStore.loading) {
        return <p>Загрузка...</p>; 
    }

    return (
        <div>
            {randomWord ? (
                <Card word={randomWord} onCheck={handleCheck} />
            ) : (
                <p>Нет слов для отображения</p>
            )}
        </div>
    );
});

export default RandomCard;