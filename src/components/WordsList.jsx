import React, { useEffect, useState } from 'react';
import Word from './Word';
import Category from './Category';
import SearchBar from './SearchInput';
import InputWordsForm from './InputWordsForm';
 

const WordsList = () => {
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingWordId, setEditingWordId] = useState(null);
    const [editedWord, setEditedWord] = useState({});

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
                const data = await response.json();
                setWords(data);
                setFilteredWords(data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка данных:', error);
            }
        };

        fetchWords();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedWord(prev => ({ ...prev, [name]: value }));
    };

    const wordEdit = (id) => {
        const wordToEdit = words.find(word => word.id === id);
        setEditedWord(wordToEdit);
        setEditingWordId(id);
    };

    const handleSave = () => {
        const updatedWords = words.map(word => 
            word.id === editingWordId ? { ...word, ...editedWord } : word
        );
        setWords(updatedWords);
        setFilteredWords(updatedWords); 
        setEditingWordId(null); 
    };

    const handleCancel = () => {
        setEditingWordId(null);
        setEditedWord({});
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

    const categoryFilter = (tag) => {
        const filtered = words.filter(word => word.tags.includes(tag));
        setFilteredWords(filtered);
    };

    return (
        <div>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <Category onFilter={categoryFilter} />
            <InputWordsForm />
            <div className="word-list">
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    filteredWords.map(word => (
                        <Word 
                            key={word.id} 
                            english={editingWordId === word.id ? editedWord.english : word.english} 
                            russian={editingWordId === word.id ? editedWord.russian : word.russian} 
                            transcription={editingWordId === word.id ? editedWord.transcription : word.transcription} 
                            tags={editingWordId === word.id ? editedWord.tags : word.tags} 
                            showButtons={true}
                            editBtn={() => wordEdit(word.id)}
                            saveBtn={handleSave}
                            cancelBtn={handleCancel}
                            handleInputChange={handleInputChange}
                            isEditing={editingWordId === word.id}
                            isEnglishEmpty={editedWord.english === ''} 
                            isRussianEmpty={editedWord.russian === ''} 
                            isTranscriptionEmpty={editedWord.transcription === ''} 
                            isTagsEmpty={editedWord.tags === ''} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default WordsList;

