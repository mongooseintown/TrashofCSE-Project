import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CompilerSegment04 from './pages/CompilerSegment04';
import CompilerSegment08 from './pages/CompilerSegment08';
import CompilerHub from './pages/CompilerHub';
import CompilerSegment07 from './pages/CompilerSegment07';
import CompilerSegment06 from './pages/CompilerSegment06';
import TopicPage from './pages/TopicPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EEE from './pages/EEE';
import PVCellNote from './pages/PVCellNote';
import OptoElectronicsNote from './pages/OptoElectronicsNote';
import StrainGaugeNote from './pages/StrainGaugeNote';
import TransducerNote from './pages/TransducerNote';
import PiezoElectricNote from './pages/PiezoElectricNote';
import ThermocoupleMathNote from './pages/ThermocoupleMathNote';
import RTDNote from './pages/RTDNote';
import PVCellPQNote from './pages/PVCellPQNote';
import RTDPQNote from './pages/RTDPQNote';
import PiezoElectricPQNote from './pages/PiezoElectricPQNote';
import TransducerPQNote from './pages/TransducerPQNote';
import DVMPQNote from './pages/DVMPQNote';
import OptoElectronicsPQNote from './pages/OptoElectronicsPQNote';
import StrainGaugePQNote from './pages/StrainGaugePQNote';
import EEESegment08 from './pages/EEESegment08';
import Navbar from './components/Navbar';
import './App.css';

import { ReactLenis } from 'lenis/react';

function AppContent() {
  const location = useLocation();
  // Hide global floating navbar on Home, Login, and Register pages
  const showNavbar = !['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compiler" element={<CompilerHub />} />
          <Route path="/compiler/segment-07" element={<CompilerSegment07 />} />
          <Route path="/compiler/segment-06" element={<CompilerSegment06 />} />
          <Route path="/compilersegment-06/:topicId" element={<TopicPage />} />
          <Route path="/compilersegment-04" element={<CompilerSegment04 />} />
          <Route path="/compilersegment-04/:topicId" element={<TopicPage />} />
          <Route path="/compilersegment-08" element={<CompilerSegment08 />} />
          <Route path="/compilersegment-08/:topicId" element={<TopicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eee" element={<EEE />} />
          <Route path="/eee/pv-cell" element={<PVCellNote />} />
          <Route path="/eee/pv-cell-pq" element={<PVCellPQNote />} />
          <Route path="/eee/opto-electronics" element={<OptoElectronicsNote />} />
          <Route path="/eee/strain-gauge" element={<StrainGaugeNote />} />
          <Route path="/eee/transducer" element={<TransducerNote />} />
          <Route path="/eee/piezo-electric" element={<PiezoElectricNote />} />
          <Route path="/eee/thermocouple-math" element={<ThermocoupleMathNote />} />
          <Route path="/eee/rtd" element={<RTDNote />} />
          <Route path="/eee/rtd-pq" element={<RTDPQNote />} />
          <Route path="/eee/piezo-electric-pq" element={<PiezoElectricPQNote />} />
          <Route path="/eee/transducer-pq" element={<TransducerPQNote />} />
          <Route path="/eee/dvm-pq" element={<DVMPQNote />} />
          <Route path="/eee/opto-electronics-pq" element={<OptoElectronicsPQNote />} />
          <Route path="/eee/strain-gauge-pq" element={<StrainGaugePQNote />} />
          <Route path="/eee/segment-08" element={<EEESegment08 />} />
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
