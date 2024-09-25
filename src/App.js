import React from 'react';
import './App.css';
import Header from './components/Header'
import WordsList from './components/WordsList'
import Footer from './components/Footer';
import RandomWord from './components/RandomWord';


function App() {

  return (
    <div className="App">
      <Header/>
      <RandomWord/>
      <WordsList/>
      <Footer/>
    </div>
  );
}

export default App;
