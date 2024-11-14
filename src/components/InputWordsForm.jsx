import React, {useState} from 'react';
import styles from './inputWordsForm.module.css';

function InputWordsForm({ onAdd }) {
    const [english, setEnglish] = useState('');
    const [russian, setTranslation] = useState('');
    const [transcription, setTranscription] = useState('');
    const [tags, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async () => {
        const newErrors = {};
        const latinRegex = /^[A-Za-z\s\[\]'\`:,.\/|~^@]*$/;
        const russianRegex = /^[А-Яа-яёЁ\s]*$/;

        // Валидация полей
        if (english.trim() === '') {
            newErrors.english = 'Поле не должно быть пустым.';
        } else if (!latinRegex.test(english)) {
            newErrors.english = 'Поле должно содержать только латиницу и знаки транскрипции.';
        }

        if (russian.trim() === '') {
            newErrors.russian = 'Поле не должно быть пустым.';
        } else if (!russianRegex.test(russian)) {
            newErrors.russian = 'Поле должно содержать только русские буквы.';
        }

        if (transcription.trim() === '') {
            newErrors.transcription = 'Поле не должно быть пустым.';
        } else if (!latinRegex.test(transcription)) {
            newErrors.transcription = 'Поле должно содержать только латиницу и знаки транскрипции.';
        }

        if (tags.trim() === '') {
            newErrors.tags = 'Поле не должно быть пустым.';
        } else if (!russianRegex.test(tags)) {
            newErrors.tags = 'Поле должно содержать только русские буквы.';
        }

        setErrors(newErrors);

        // Проверка на наличие ошибок
        if (Object.keys(newErrors).length === 0) {
            const newWord = {
                //id: null,
                english: english,
                russian: russian,
                transcription: transcription,
                tags: tags,
                tags_json: '"new word"', 
            };

            try {
                const response = await fetch('http://itgirlschool.justmakeit.ru/api/words/add', 
                {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(newWord),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Ошибка при сохранении данных: ${errorData.message}`);
            }

            const savedWord = await response.json(); // Получаем сохраненное слово из ответа
            console.log('Данные успешно сохранены:', savedWord);
            setSuccessMessage('Слово успешно сохранено!');
            onAdd(savedWord); // Передаем сохраненное слово в WordsList
            // Очищаем поля формы
            setEnglish('');
            setTranslation('');
            setTranscription('');
            setCategory('');
        } catch (error) {
            setSuccessMessage(`Ошибка при сохранении данных. ${error.message}`);
            console.error('Ошибка:', error);
        }
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
            value={russian}
            onChange={(e) => setTranslation(e.target.value)}
            className={errors.russian ? styles.errorInput : ''}
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
            value={tags}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.tags ? styles.errorInput : ''}
        />
        <div className={styles.allButtons}>
            <button 
                className={styles.addBtn} 
                type="button" 
                onClick={handleSave}
                disabled={english.trim() === '' || russian.trim() === '' || transcription.trim() === '' || tags.trim() === ''}
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
}
export default InputWordsForm;