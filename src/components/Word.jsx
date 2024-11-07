import React, { useState, useEffect } from 'react';
import styles from './word.module.css'

function Word(props) {
    return (
        <div className={styles.word}>
            <div className={`${styles.wordTable} ${props.customClass}`}>
                {props.isEditing ? (
                    <>
                        <input 
                            type="text" 
                            name="english" 
                            value={props.english} 
                            onChange={props.handleInputChange} 
                            className={props.isEnglishEmpty ? styles.errorInput : ''} 
                        />
                        <input 
                            type="text" 
                            name="russian" 
                            value={props.russian} 
                            onChange={props.handleInputChange} 
                            className={props.isRussianEmpty ? styles.errorInput : ''} 
                        />
                        <input 
                            type="text" 
                            name="transcription" 
                            value={props.transcription} 
                            onChange={props.handleInputChange} 
                            className={props.isTranscriptionEmpty ? styles.errorInput : ''} 
                        />
                        <input 
                            type="text" 
                            name="tags" 
                            value={props.tags} 
                            onChange={props.handleInputChange} 
                            className={props.isTagsEmpty ? styles.errorInput : ''} 
                        />
                        <div className='changeBtn'>
                            <button 
                                className={styles.saveBtn} 
                                onClick={props.saveBtn} 
                                disabled={props.isEnglishEmpty || props.isRussianEmpty || props.isTranscriptionEmpty || props.isTagsEmpty} // Блокировка кнопки
                            >
                                <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/262/PNG/64/checkmark_29376.png" />
                            </button>
                            <button className={styles.cancelBtn} onClick={props.cancelBtn}>
                                <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/55/PNG/128/Pincancellation_11230.png" />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className={styles.wordTitle}>{props.english}</p>
                        <p className={styles.wordText}>{props.russian}</p>
                        <p className={styles.wordTransc}>{props.transcription}</p>
                        <p className={styles.wordCategory}>{props.tags}</p>
                        {props.showButtons && (
                            <div className={styles.allButtons}>
                                <button className={styles.editBtn} onClick={props.editBtn}>
                                    <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/1572/PNG/512/3592869-compose-create-edit-edit-file-office-pencil-writing-creative_107746.png" />
                                </button>
                                <button className={styles.deleteBtn} onClick={() => props.deleteBtn(props.id)}>
                                    <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/1150/PNG/512/1486504830-delete-dustbin-empty-recycle-recycling-remove-trash_81361.png" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Word;