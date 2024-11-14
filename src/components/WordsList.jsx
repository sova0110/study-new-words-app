import React, { Component } from 'react';
import Word from './Word';
import Category from './Category';
import SearchBar from './SearchInput';
import InputWordsForm from './InputWordsForm';
import LoadingIndicator from './LoadingIndicator';
class WordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            filteredWords: [],
            loading: true,
            searchTerm: '',
            editingWordId: null,
            editedWord: {},
        };
    }

    componentDidMount() {
        this.fetchWords();
    }

    fetchWords = async () => {
        try {
            const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
            const data = await response.json();
            this.setState({ 
                words: data, 
                filteredWords: data, 
                loading: false 
            });

        } catch (error) {
            console.error('Ошибка данных:', error);
        }
    };
    handleAdd = async (newWord) => {
        const wordToSend = {
            english: newWord.english,
            russian: newWord.russian,
            transcription: newWord.transcription,
            tags: newWord.category,
            tags_json: '[]', 
        };
    
        try {
            const response = await fetch('http://itgirlschool.justmakeit.ru/api/words/add', {   
            method: 'POST',
            mode: 'no-cors',
            headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(wordToSend),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Ошибка при сохранении данных: ${errorData.message}`);
            }
    
            const savedWord = await response.json(); // Получаем сохраненное слово из ответа
            console.log('Данные успешно сохранены:', savedWord);
            this.setState(prevState => ({
                words: [...prevState.words, savedWord],
                filteredWords: [...prevState.filteredWords, savedWord],
            }));
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            editedWord: { ...prevState.editedWord, [name]: value }
        }));
    };

    wordEdit = (id) => {
        const wordToEdit = this.state.words.find(word => word.id === id);
        this.setState({ editedWord: wordToEdit, editingWordId: id });
    };

    handleSave = async () => {
        const { editedWord, editingWordId } = this.state;

        try {
            const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${editingWordId}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedWord),
            });

            if (!response.ok) {
                throw new Error('Ошибка при сохранении данных');
            }

            const updatedWords = this.state.words.map(word => 
                word.id === editingWordId ? { ...word, ...editedWord } : word
            );

            this.setState({ words: updatedWords, filteredWords: updatedWords, editingWordId: null });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    handleCancel = () => {
        this.setState({ editingWordId: null, editedWord: {} });
    };
    handleDelete = async (id) => {
    try {
        const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Если ответ не успешный, обработайте ошибку
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Ошибка при удалении данных: ${errorData.message}`);
        }

        // Удаляем слово из состояния
        this.setState(prevState => ({
            words: prevState.words.filter(word => word.id !== id),
            filteredWords: prevState.filteredWords.filter(word => word.id !== id),
        }));
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

    handleSearchChange = (event) => {
        const value = event.target.value;
        this.setState({ searchTerm: value });

        const filtered = this.state.words.filter(word =>
            word.english.toLowerCase().includes(value.toLowerCase()) || 
            word.russian.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ filteredWords: filtered });
    };

    categoryFilter = (tag) => {
        const filtered = this.state.words.filter(word => word.tags.includes(tag));
        this.setState({ filteredWords: filtered });
    };

    render() {
        return (
            <div>
                <SearchBar searchTerm={this.state.searchTerm} onSearchChange={this.handleSearchChange} />
                <Category onFilter={this.categoryFilter} />
                <InputWordsForm onAdd={this.handleAdd} />
                <div className="word-list">
                    {this.state.loading ? (
                         <LoadingIndicator />
                    ) : (
                        this.state.filteredWords.map(word => (
                            <Word 
                                key={word.id} 
                                id={word.id} // Передаем id
                                tags_json={word.tags_json} // Передаем tags_json
                                english={this.state.editingWordId === word.id ? this.state.editedWord.english : word.english} 
                                russian={this.state.editingWordId === word.id ? this.state.editedWord.russian : word.russian} 
                                transcription={this.state.editingWordId === word.id ? this.state.editedWord.transcription : word.transcription} 
                                tags={this.state.editingWordId === word.id ? this.state.editedWord.tags : word.tags} 
                                showButtons={true}
                                editBtn={() => this.wordEdit(word.id)}
                                saveBtn={this.handleSave}
                                deleteBtn={this.handleDelete}
                                cancelBtn={this.handleCancel}
                                handleInputChange={this.handleInputChange}
                                isEditing={this.state.editingWordId === word.id}
                                isEnglishEmpty={this.state.editedWord.english === ''} 
                                isRussianEmpty={this.state.editedWord.russian === ''} 
                                isTranscriptionEmpty={this.state.editedWord.transcription === ''} 
                                isTagsEmpty={this.state.editedWord.tags === ''} 
                            />
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default WordsList;

