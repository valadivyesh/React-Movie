import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
