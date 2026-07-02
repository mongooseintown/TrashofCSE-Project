import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CompilerSegment04 from './pages/CompilerSegment04';
import CompilerSegment08 from './pages/CompilerSegment08';
import TopicPage from './pages/TopicPage';
import Login from './pages/Login';
import Home from './pages/Home';
import EEE from './pages/EEE';
import PVCellNote from './pages/PVCellNote';
import OptoElectronicsNote from './pages/OptoElectronicsNote';
import StrainGaugeNote from './pages/StrainGaugeNote';
import TransducerNote from './pages/TransducerNote';
import Navbar from './components/Navbar';
import './App.css';

import { ReactLenis } from 'lenis/react';

function AppContent() {
  const location = useLocation();
  // Hide global floating navbar on the home page to match exact landing page mockup design
  const showNavbar = location.pathname !== '/';

  return (
    <div className="App">
      {showNavbar && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compilersegment-04" element={<CompilerSegment04 />} />
          <Route path="/compilersegment-04/:topicId" element={<TopicPage />} />
          <Route path="/compilersegment-08" element={<CompilerSegment08 />} />
          <Route path="/compilersegment-08/:topicId" element={<TopicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eee" element={<EEE />} />
          <Route path="/eee/pv-cell" element={<PVCellNote />} />
          <Route path="/eee/opto-electronics" element={<OptoElectronicsNote />} />
          <Route path="/eee/strain-gauge" element={<StrainGaugeNote />} />
          <Route path="/eee/transducer" element={<TransducerNote />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <ReactLenis root>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
