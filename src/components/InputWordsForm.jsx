import React from 'react'
import styles from './inputWordsForm.module.css';
function InputWordsForm() {
    return(
        <div className={styles.inputWords}>
        <input
        type="text"
        placeholder="English"
        
      />
      <input
        type="text"
        placeholder="Перевод"
        
      />
      <input
        type="text"
        placeholder="Transcription"
       
      />
      <input
        type="text"
        placeholder="Категория"
        
      />
      <div className={styles.allButtons}>
            <button className={styles.saveBtn}> 
            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/262/PNG/64/checkmark_29376.png" />
            </button>
            <button className={styles.deleteBtn}> 
            <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/55/PNG/128/Pincancellation_11230.png" />
            </button>
        </div>
        </div>
    )
}
export default InputWordsForm;