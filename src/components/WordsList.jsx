import React, { useEffect, useState } from 'react';
import Word from './Word';
import Category from './Category';
import SearchBar from './SearchInput';
import InputWordsForm from './InputWordsForm';
 

function WordsList() {
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                const data = await response.json();
                setWords(data);
                setFilteredWords(data);
            } catch (error) {
                console.error('не возоможно отобразить слово:', error);
            }
        };

        fetchWords();
    }, []);

    const categoryFilter = (tag) => {
        const filtered = words.filter(word => word.tags === tag);
        setFilteredWords(filtered);
    };

    const wordEdit = (id) => {
        console.log('здесь должен быть функционал по редактированию:', id);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = words.filter(word =>
            word.english.toLowerCase().includes(value.toLowerCase()) ||
            word.russian.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredWords(filtered);
    };

    return (
        <div>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <Category onFilter={categoryFilter} />
            <InputWordsForm/>
            <div className="word-list">
                {filteredWords.map(word => (
                    <Word 
                        key={word.id} 
                        english={word.english} 
                        russian={word.russian} 
                        transcription={word.transcription} 
                        tags={word.tags} 
                        showButtons={true}/>
                         
                ))}
            </div>
        </div>
    );
}

export default WordsList;