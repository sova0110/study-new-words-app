import React, {useState} from 'react';
import styles from './inputWordsForm.module.css';
import { observer } from 'mobx-react';
import Word from './Word';
import  wordStore  from '../store/wordStore';

const InputWordsForm = observer(() => {
    const [english, setEnglish] = useState('');
    const [translation, setTranslation] = useState('');
    const [transcription, setTranscription] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async () => {
        const newErrors = {};
        const latinRegex = /^[A-Za-z\s\[\]'\`:,.\/|~^@æaðɔʒʌəʧθ]*$/;
        const russianRegex = /^[А-Яа-яёЁ\s]*$/;

        if (english.trim() === '') {
            newErrors.english = 'Поле не должно быть пустым.';
        } else if (!latinRegex.test(english)) {
            newErrors.english = 'Поле должно содержать только латиницу и знаки транскрипции.';
        }

        if (translation.trim() === '') {
            newErrors.translation = 'Поле не должно быть пустым.';
        } else if (!russianRegex.test(translation)) {
            newErrors.translation = 'Поле должно содержать только русские буквы.';
        }

        if (transcription.trim() === '') {
            newErrors.transcription = 'Поле не должно быть пустым.';
        } else if (!latinRegex.test(transcription)) {
            newErrors.transcription = 'Поле должно содержать только латиницу и знаки транскрипции.';
        }

        if (category.trim() === '') {
            newErrors.category = 'Поле не должно быть пустым.';
        } else if (!russianRegex.test(category)) {
            newErrors.category = 'Поле должно содержать только русские буквы.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const newWord = {
                english,
                russian: translation, // Сохраняем перевод в поле russian
                transcription,
                category, // Используем поле category как тег
                tags_json: [], // Поле tags_json остается пустым
            };

            await wordStore.addWord(newWord);
            setSuccessMessage('Слово успешно сохранено!');
            setEnglish('');
            setTranslation('');
            setTranscription('');
            setCategory('');
        } else {
            setSuccessMessage('');
        }
    };

    return (
        <div className={styles.inputWords}>
            <input
                type="text"
                placeholder="English"
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                className={errors.english ? styles.errorInput : ''} 
            />
            <input
                type="text"
                placeholder="Перевод"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className={errors.translation ? styles.errorInput : ''} 
            />
            <input
                type="text"
                placeholder="Transcription"
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className={errors.transcription ? styles.errorInput : ''} 
            />
            <input
                type="text"
                placeholder="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={errors.category ? styles.errorInput : ''} 
            />
            <div className={styles.allButtons}>
                <button 
                    className={styles.saveBtn} 
                    type="button" 
                    onClick={handleSave}
                    disabled={english.trim() === '' || translation.trim() === '' || transcription.trim() === '' || category.trim() === ''}
                    >
                        <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/262/PNG/64/checkmark_29376.png" alt="Сохранить" />
                    </button>
                    <button className={styles.deleteBtn} type="button">
                        <img className={styles.imgBtn} src="https://cdn.icon-icons.com/icons2/55/PNG/128/Pincancellation_11230.png" alt="Удалить" />
                    </button>
                </div>
                <div className={styles.messages}>
                    <div className={styles.errorMessages}>
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                </div>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            </div>
        );
    });
export default InputWordsForm;