import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './auth.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddMarble from './pages/AddMarble';
import MarbleDetail from './pages/MarbleDetail';
import Register from './pages/Register';
import Login from './pages/Login';

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
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
