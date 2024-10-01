import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage'; 
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import CharacterPage from './pages/CharacterPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import LoginAdmin from './pages/LoginAdmin';
import SignupAdmin from './pages/SignupAdmin';
import AdminDashboard from './pages/AdminDashboard';
import CharacterManagement from './pages/CharacterManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/signup" element={<SignupAdmin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/admin/dashboard/character"
          element={
            <ProtectedRoute adminOnly={true}>
              <CharacterManagement />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <ProtectedRoute>
              <BlogPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/character" 
          element={
            <ProtectedRoute>
              <CharacterPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
