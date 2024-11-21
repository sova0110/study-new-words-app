import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import mobx from 'mobx'
import wordStore from '../store/wordStore';
import styles from './word.module.css'

const Word = observer(({ word }) => {
    const { isEditing, currentWord, saveWord, handleInputChange, cancelEdit, isEnglishEmpty, isRussianEmpty, isTranscriptionEmpty, isTagsEmpty } = wordStore;

    return (
        <div className={styles.word}>
            {isEditing && currentWord.id === word.id ? (
                <>
                    <input 
                        type="text" 
                        name="english" 
                        value={currentWord.english} 
                        onChange={handleInputChange} 
                        className={isEnglishEmpty ? styles.errorInput : ''} 
                    />
                    <input 
                        type="text" 
                        name="russian" 
                        value={currentWord.russian} 
                        onChange={handleInputChange} 
                        className={isRussianEmpty ? styles.errorInput : ''}
                        />
                    <input 
                        type="text" 
                        name="transcription" 
                        value={currentWord.transcription} 
                        onChange={handleInputChange} 
                        className={isTranscriptionEmpty ? styles.errorInput : ''} 
                    />
                    <input 
                        type="text" 
                        name="tags" 
                        value={currentWord.tags} 
                        onChange={handleInputChange} 
                        className={isTagsEmpty ? styles.errorInput : ''} 
                    />
                    <div className='changeBtn'>
                        <button 
                            className={styles.saveBtn} 
                            onClick={saveWord} 
                            disabled={isEnglishEmpty || isRussianEmpty || isTranscriptionEmpty || isTagsEmpty}
                        >
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/262/PNG/64/checkmark_29376.png" alt="Сохранить" />
                        </button>
                        <button className={styles.cancelBtn} onClick={cancelEdit}>
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/55/PNG/128/Pincancellation_11230.png" alt="Отмена" />
                        </button>
                    </div>
                </>
            ) : (
                <div className={styles.wordTable}>
                    <p className={styles.wordTitle}>{word.english}</p>
                    <p className={styles.wordText}>{word.russian}</p>
                    <p className={styles.wordTransc}>{word.transcription}</p>
                    <p className={styles.wordCategory}>{word.tags}</p>
                    <div className={styles.allButtons}>
                        <button className={styles.editBtn} onClick={() => wordStore.editWord(word)}>
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/1572/PNG/512/3592869-compose-create-edit-edit-file-office-pencil-writing-creative_107746.png" alt="Редактировать" />
                        </button>
                        <button className={styles.deleteBtn} onClick={() => wordStore.deleteWord(word.id)}>
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/1150/PNG/512/1486504830-delete-dustbin-empty-recycle-recycling-remove-trash_81361.png" alt="Удалить"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Word;