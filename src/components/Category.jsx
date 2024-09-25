import React, { useEffect, useState } from 'react';
import styles from './category.module.css'

function Category({ onFilter }) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                const data = await response.json();
                const uniqueTags = data.map(item => item.tags).filter((value, index, self) => self.indexOf(value) === index);
                setTags(uniqueTags);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchTags();
    }, []);

    return (
        <div className="category--choose">
            <h3 className='categoryChoose'>Выбери категорию</h3>
            <div className='buttonRow'>
                {tags.map((tag, index) => (
                    <button key={index} className={styles.button} onClick={() => onFilter(tag)}>
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Category;