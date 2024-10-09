import React from 'react';
import './App.css';
import Header from './components/Header';
import WordsList from './components/WordsList';
import Footer from './components/Footer';
import RandomWord from './components/RandomWord';
import CardList from './components/CardList';

function App() {

  return (
    <div className="App">
      <Header/>
      <RandomWord/>
      <CardList/>
      <WordsList/>
      <Footer/>
    </div>
  );
}

export default App;
