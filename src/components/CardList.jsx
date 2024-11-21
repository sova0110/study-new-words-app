import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import LoadingIndicator from './LoadingIndicator';
import styles from './cardList.module.css';
import { observer } from 'mobx-react';
import cardStore from '../store/cardStore';

const CardList = observer(() => {
    useEffect(() => {
        cardStore.fetchWords();
    }, []);

    const { loading, currentWord, showRussian, currentIndex, learnedCount } = cardStore;

    return (
        <div className={styles.slider}>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className={styles.cardContainer}>
                    <button onClick={() => cardStore.prevCard()} className={styles.arrow}>←</button>
                    <Card 
                        id={currentWord.id} 
                        english={currentWord.english} 
                        russian={showRussian ? currentWord.russian : ''}
                        transcription={currentWord.transcription} 
                        showCheckButton={!showRussian}
                        handleCheck={() => cardStore.handleCheck()} 
                        incrementLearned={(id) => cardStore.incrementLearned(id)} 
                    />
                    <button onClick={() => cardStore.nextCard()} className={styles.arrow}>→</button>
                </div>
            )}
            <div className={styles.cardCounter}>
                {`${currentIndex + 1} / ${cardStore.words.length}`}
            </div>
            <div className={styles.learnedCount}>
                {`Изучено слов: ${learnedCount}`}
            </div>
        </div>
    );
});

export default CardList;