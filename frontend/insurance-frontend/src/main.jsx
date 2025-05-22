import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonsPage from './pages/PersonsPage.jsx';
import CarsPage from './pages/CarsPage.jsx';
import AccidentsPage from './pages/AccidentsPage.jsx';
import OwnsPage from './pages/OwnsPage.jsx';
import ParticipatedPage from './pages/ParticipatedPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/persons" element={<PersonsPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/accidents" element={<AccidentsPage />} />
        <Route path="/owns" element={<OwnsPage />} />
        <Route path="/participated" element={<ParticipatedPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
