import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import WordsList from './components/WordsList';
import Footer from './components/Footer';
import RandomWord from './components/RandomWord';
import CardList from './components/CardList';
import ErrorPage from './components/errorPage';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<WordsList />} />
          <Route path="/random" element={<RandomWord />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/load" element={<LoadingIndicator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;