import React from 'react'
import './App.css';
import Header from './components/Header'
import WordsList from './components/WordsList'
import Languages from './components/Languages';
import Category from './components/Category';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Languages/>
      <Category/>
      <WordsList/>
      <Footer/>
    </div>
  );
}

export default App;
