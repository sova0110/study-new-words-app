import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'mobx-react';
import Header from './components/Header';
import WordsList from './components/WordsList';
import Footer from './components/Footer';
import CardList from './components/CardList';
import ErrorPage from './components/errorPage';
import wordStore from './store/wordStore';
import RandomCard from './components/RandomCard';

function App() {
  return (
    <Provider wordStore={wordStore}> 
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<WordsList />} />
            <Route path="/cards" element={<CardList />} />
            <Route path="/random_card" element={<RandomCard />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;