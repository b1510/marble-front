import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarbleGallery from './components/MarbleGallery';
import MarbleForm from './components/MarbleForm';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1>Marble Collection</h1>
                </header>
                <main>
                    <MarbleForm />
                    <Routes>
                        <Route path="/" element={<MarbleGallery />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
