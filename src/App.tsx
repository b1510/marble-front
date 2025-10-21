import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMarble from './pages/AddMarble';
import MarbleDetail from './pages/MarbleDetail';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<AddMarble />} />
                        <Route path="/marble/:id" element={<MarbleDetail />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
