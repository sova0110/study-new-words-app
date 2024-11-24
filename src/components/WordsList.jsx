import React, { Component } from 'react';
import mobx from 'mobx'
import { observer } from 'mobx-react';
import Word from './Word';
import  wordStore  from '../store/wordStore';
import InputWordsForm from './InputWordsForm';
import LoadingIndicator from './LoadingIndicator';
import styles from './word.module.css'

@observer
class WordsList extends Component {
    state = {
        searchTerm: '',
        filteredWords: [],
    };

    componentDidMount() {
        wordStore.fetchWords();
    }

    handleSearchChange = (event) => {
        const value = event.target.value;
        this.setState({ searchTerm: value });

        const filtered = wordStore.words.filter(word =>
            word.english.toLowerCase().includes(value.toLowerCase()) || 
            word.russian.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ filteredWords: filtered });
    };

    render() {
        const { words, loading } = wordStore;
        const { searchTerm, filteredWords } = this.state;

        if (loading) {
            return <div><LoadingIndicator /></div>;
        }

        const displayWords = searchTerm ? filteredWords : words;

        return (
            <div>
                <input  className={styles.searchInput}
                    type="text"
                    placeholder="Поиск слова по английскому или русскому"
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                />
                <InputWordsForm onAdd={this.handleAdd} />
                {displayWords.map(word => (
                    <Word key={word.id} word={word} />
                ))}
            </div>
        );
    }
}

export default WordsList;

