import { makeAutoObservable } from 'mobx';

class CardStore {
    words = [];
    loading = true;
    currentIndex = 0;
    showRussian = false;
    learnedCount = 0;
    learnedWords = new Set();

    constructor() {
        makeAutoObservable(this);
    }

    async fetchWords() {
        try {
            const response = await fetch('https://itgirlschool.justmakeit.ru/api/words');
            const data = await response.json();
            this.words = data;
            this.loading = false;
        } catch (error) {
            console.error('Ошибка данных:', error);
        }
    }

    nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        this.showRussian = false;
    }

    prevCard() {
        this.currentIndex = (this.currentIndex - 1 + this.words.length) % this.words.length;
        this.showRussian = false;
    }

    handleCheck() {
        this.showRussian = true;
    }

    incrementLearned(id) {
        if (!this.learnedWords.has(id)) {
            this.learnedCount += 1;
            this.learnedWords.add(id);
        }
    }

    get currentWord() {
        return this.words[this.currentIndex];
    }
}


const cardStore = new CardStore();

export default cardStore;





