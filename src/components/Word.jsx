import React from 'react'
import styles from './word.module.css'

function Word(props) {
    return (
        <div className="word">
            <div className={styles.wordTable}>
                <p className={styles.wordTitle}>{props.english}</p>
                <p className={styles.wordText}>{props.russian}</p>
                <p className={styles.wordTransc}>{props.transcription}</p>
                <p className={styles.wordCategory}>{props.tags}</p>
                {props.showButtons && (  // Условный рендеринг кнопок
                    <div className={styles.allButtons}>
                        <button className={styles.editBtn} onClick={() => props.editBtn(props.id)}> 
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/1572/PNG/512/3592869-compose-create-edit-edit-file-office-pencil-writing-creative_107746.png" />
                        </button>
                        <button className={styles.deleteBtn} onClick={() => props.deleteBtn(props.id)}> 
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/1150/PNG/512/1486504830-delete-dustbin-empty-recycle-recycling-remove-trash_81361.png" />
                        </button>
                        <button className={styles.saveBtn} onClick={() => props.saveBtn(props.id)}> 
                            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/262/PNG/64/checkmark_29376.png" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Word;