import React, { Component } from 'react';
import mobx from 'mobx'
import { observer } from 'mobx-react';
import Word from './Word';
import  wordStore  from '../store/wordStore';
import Category from './Category';
import SearchBar from './SearchInput';
import InputWordsForm from './InputWordsForm';


@observer
class WordsList extends Component {
    componentDidMount() {
        wordStore.fetchWords();
    }
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
        const { words, loading } = wordStore;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            
            <div>
                <Category onFilter={this.categoryFilter} />
                 <InputWordsForm onAdd={this.handleAdd} />
                {words.map(word => (
                    <Word key={word.id} word={word} />
                ))}
            </div>
        );
    }
}

export default WordsList;

