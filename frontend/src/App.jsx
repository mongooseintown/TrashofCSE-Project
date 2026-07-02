import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompilerSegment04 from './pages/CompilerSegment04';
import CompilerSegment08 from './pages/CompilerSegment08';
import TopicPage from './pages/TopicPage';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './App.css';

import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <div>
            <Routes>
              <Route path="/" element={<div style={{ minHeight: '100vh', backgroundColor: '#0b0b0b' }} />} />
              <Route path="/compilersegment-04" element={<CompilerSegment04 />} />
              <Route path="/compilersegment-04/:topicId" element={<TopicPage />} />
              <Route path="/compilersegment-08" element={<CompilerSegment08 />} />
              <Route path="/compilersegment-08/:topicId" element={<TopicPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
