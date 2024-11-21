import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from "uuid";

class WordStore {
    words = [];
    isEditing = false;
    currentWord = null;
    loading = true;

    constructor() {
        makeAutoObservable(this);
    }
    async addWord(newWord) {
        this.words.push(newWord);
        await this.saveWordToServer(newWord);
    }

    async saveWordToServer(word) {
        try {
            await fetch("http://itgirlschool.justmakeit.ru/api/words/add", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(word)
            });
        } catch (error) {
            console.error("Error adding word to server:", error);
        }
    }

    async fetchWords() {
        this.loading = true;
        try {
            const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
            const data = await response.json();
            this.words = data;
        } catch (error) {
            console.error('Ошибка данных:', error);
        } finally {
            this.loading = false;
        }
    }

    editWord(word) {
        this.currentWord = { ...word };
        this.isEditing = true;
    }

    saveWord = async () => { 
        if (this.currentWord) {
            const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${this.currentWord.id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.currentWord),
            });

            if (response.ok) {
                await this.fetchWords();
                this.cancelEdit();
            } else {
                console.error('Ошибка при сохранении данных');
            }
        }
    }

    async deleteWord(wordId) { 
        const response = await fetch(`https://itgirlschool.justmakeit.ru/api/words/${wordId}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            await this.fetchWords(); 
        } else {
            console.error('Ошибка при удалении данных');
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.currentWord[name] = value;
    }

    cancelEdit() {
        this.isEditing = false;
        this.currentWord = null;
    }

    get isEnglishEmpty() {
        return !this.currentWord?.english;
    }

    get isRussianEmpty() {
        return !this.currentWord?.russian;
    }

    get isTranscriptionEmpty() {
        return !this.currentWord?.transcription;
    }

    get isTagsEmpty() {
        return !this.currentWord?.tags;
    }
}

const wordStore = new WordStore();

export default wordStore;





