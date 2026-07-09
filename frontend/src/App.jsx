import React, { useState, useEffect } from 'react';
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
import ThermocouplePQNote from './pages/ThermocouplePQNote';
import ThermistorPQNote from './pages/ThermistorPQNote';
import EEESegment08 from './pages/EEESegment08';
import EEESegment07 from './pages/EEESegment07';
import PotentiometerMathNote from './pages/PotentiometerMathNote';
import MeasurementInstrumentationNote from './pages/MeasurementInstrumentationNote';
import GeneralizedMeasurementNote from './pages/GeneralizedMeasurementNote';
import TypesOfErrorsNote from './pages/TypesOfErrorsNote';
import AccuracyPrecisionNote from './pages/AccuracyPrecisionNote';
import DisplayDevicesNote from './pages/DisplayDevicesNote';
import DFMNote from './pages/DFMNote';
import InstrumentationAmplifierNote from './pages/InstrumentationAmplifierNote';
import EEESegment04 from './pages/EEESegment04';
import EEESegment05 from './pages/EEESegment05';
import EEESegment06 from './pages/EEESegment06';
import EEEGroupA from './pages/EEEGroupA';
import StepperMotorNote from './pages/StepperMotorNote';
import Profile from './pages/Profile';
import ComputerArchitecture from './pages/ComputerArchitecture';
import CASegment05 from './pages/CASegment05';
import CAMultiCycleHub from './pages/CAMultiCycleHub';
import CAIntroductionHub from './pages/CAIntroductionHub';
import CASingleVsMultiNote from './pages/CASingleVsMultiNote';
import CALogicConventionNote from './pages/CALogicConventionNote';
import CATempRegistersNote from './pages/CATempRegistersNote';
import CAHardwareChangesNote from './pages/CAHardwareChangesNote';
import CADatapathDesignNote from './pages/CADatapathDesignNote';
import CAControlSignalsNote from './pages/CAControlSignalsNote';
import CALogicElementsNote from './pages/CALogicElementsNote';
import CASuggestionsNote from './pages/CASuggestionsNote';
import CAShafiullahSuggestionsNote from './pages/CAShafiullahSuggestionsNote';
import CAAmanullahGuidelinesNote from './pages/CAAmanullahGuidelinesNote';
import CASegment08 from './pages/CASegment08';
import CADMANote from './pages/CADMANote';
import CAHandshakingNote from './pages/CAHandshakingNote';
import CASyncAsyncNote from './pages/CASyncAsyncNote';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ActiveUsersWidget from './components/ActiveUsersWidget';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CompilerLocked from './pages/CompilerLocked';
import './App.css';

import { ReactLenis } from 'lenis/react';

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const isLoggedIn = !!(token && storedUser);

  return (
    <div className="App">
      <Navbar />

      <div className={`app-container ${isLoggedIn ? 'has-sidebar' : ''}`}>
        {isLoggedIn && <Sidebar />}
        <div className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Admin Restricted Compiler Routes */}
          <Route path="/compiler" element={<AdminRoute><CompilerHub /></AdminRoute>} />
          <Route path="/compiler/segment-07" element={<AdminRoute><CompilerSegment07 /></AdminRoute>} />
          <Route path="/compiler/segment-06" element={<AdminRoute><CompilerSegment06 /></AdminRoute>} />
          <Route path="/compilersegment-06/:topicId" element={<AdminRoute><TopicPage /></AdminRoute>} />
          <Route path="/compiler/segment-04" element={<AdminRoute><CompilerSegment04 /></AdminRoute>} />
          <Route path="/compiler/locked" element={<CompilerLocked />} />

          {/* Computer Architecture Routes */}
          <Route path="/computer-architecture" element={<PrivateRoute><ComputerArchitecture /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-05" element={<PrivateRoute><CASegment05 /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-05/introduction" element={<PrivateRoute><CAIntroductionHub /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-05/multi-cycle" element={<PrivateRoute><CAMultiCycleHub /></PrivateRoute>} />
          <Route path="/computer-architecture/single-vs-multi-cycle" element={<PrivateRoute><CASingleVsMultiNote /></PrivateRoute>} />
          <Route path="/computer-architecture/logic-convention" element={<PrivateRoute><CALogicConventionNote /></PrivateRoute>} />
          <Route path="/computer-architecture/temp-registers" element={<PrivateRoute><CATempRegistersNote /></PrivateRoute>} />
          <Route path="/computer-architecture/hardware-changes" element={<PrivateRoute><CAHardwareChangesNote /></PrivateRoute>} />
          <Route path="/computer-architecture/datapath-design" element={<PrivateRoute><CADatapathDesignNote /></PrivateRoute>} />
          <Route path="/computer-architecture/control-signals" element={<PrivateRoute><CAControlSignalsNote /></PrivateRoute>} />
          <Route path="/computer-architecture/logic-elements" element={<PrivateRoute><CALogicElementsNote /></PrivateRoute>} />
          <Route path="/computer-architecture/suggestions" element={<PrivateRoute><CASuggestionsNote /></PrivateRoute>} />
          <Route path="/computer-architecture/suggestions-shafiullah" element={<PrivateRoute><CAShafiullahSuggestionsNote /></PrivateRoute>} />
          <Route path="/computer-architecture/guidelines-amanullah" element={<PrivateRoute><CAAmanullahGuidelinesNote /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-08" element={<PrivateRoute><CASegment08 /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-08/dma" element={<PrivateRoute><CADMANote /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-08/handshaking-protocol" element={<PrivateRoute><CAHandshakingNote /></PrivateRoute>} />
          <Route path="/computer-architecture/segment-08/sync-async" element={<PrivateRoute><CASyncAsyncNote /></PrivateRoute>} />

          {/* EEE Routes */}
          <Route path="/eee" element={<PrivateRoute><EEE /></PrivateRoute>} />
          <Route path="/eee/segment-04" element={<PrivateRoute><EEESegment04 /></PrivateRoute>} />
          <Route path="/eee/segment-05" element={<PrivateRoute><EEESegment05 /></PrivateRoute>} />
          <Route path="/eee/segment-06" element={<PrivateRoute><EEESegment06 /></PrivateRoute>} />
          <Route path="/eee/segment-07" element={<PrivateRoute><EEESegment07 /></PrivateRoute>} />
          <Route path="/eee/group-a" element={<PrivateRoute><EEEGroupA /></PrivateRoute>} />
          <Route path="/eee/stepper-motor" element={<PrivateRoute><StepperMotorNote /></PrivateRoute>} />
          <Route path="/eee/display-devices" element={<PrivateRoute><DisplayDevicesNote /></PrivateRoute>} />
          <Route path="/eee/instrumentation-amplifier" element={<PrivateRoute><InstrumentationAmplifierNote /></PrivateRoute>} />
          <Route path="/eee/measurement-instrumentation" element={<PrivateRoute><MeasurementInstrumentationNote /></PrivateRoute>} />
          <Route path="/eee/generalized-measurement-system" element={<PrivateRoute><GeneralizedMeasurementNote /></PrivateRoute>} />
          <Route path="/eee/types-of-errors" element={<PrivateRoute><TypesOfErrorsNote /></PrivateRoute>} />
          <Route path="/eee/accuracy-precision" element={<PrivateRoute><AccuracyPrecisionNote /></PrivateRoute>} />
          <Route path="/eee/segment-08" element={<PrivateRoute><EEESegment08 /></PrivateRoute>} />
          <Route path="/eee/dfm-pq" element={<PrivateRoute><DFMNote /></PrivateRoute>} />
          <Route path="/eee/pv-cell" element={<PrivateRoute><PVCellNote /></PrivateRoute>} />
          <Route path="/eee/opto-electronics" element={<PrivateRoute><OptoElectronicsNote /></PrivateRoute>} />
          <Route path="/eee/strain-gauge" element={<PrivateRoute><StrainGaugeNote /></PrivateRoute>} />
          <Route path="/eee/transducer" element={<PrivateRoute><TransducerNote /></PrivateRoute>} />
          <Route path="/eee/piezo-electric" element={<PrivateRoute><PiezoElectricNote /></PrivateRoute>} />
          <Route path="/eee/thermocouple-math" element={<PrivateRoute><ThermocoupleMathNote /></PrivateRoute>} />
          <Route path="/eee/rtd" element={<PrivateRoute><RTDNote /></PrivateRoute>} />
          <Route path="/eee/potentiometer-math" element={<PrivateRoute><PotentiometerMathNote /></PrivateRoute>} />
          
          {/* EEE Prev Questions Routes */}
          <Route path="/eee/pv-cell-pq" element={<PrivateRoute><PVCellPQNote /></PrivateRoute>} />
          <Route path="/eee/rtd-pq" element={<PrivateRoute><RTDPQNote /></PrivateRoute>} />
          <Route path="/eee/piezo-electric-pq" element={<PrivateRoute><PiezoElectricPQNote /></PrivateRoute>} />
          <Route path="/eee/transducer-pq" element={<PrivateRoute><TransducerPQNote /></PrivateRoute>} />
          <Route path="/eee/dvm-pq" element={<PrivateRoute><DVMPQNote /></PrivateRoute>} />
          <Route path="/eee/opto-electronics-pq" element={<PrivateRoute><OptoElectronicsPQNote /></PrivateRoute>} />
          <Route path="/eee/strain-gauge-pq" element={<PrivateRoute><StrainGaugePQNote /></PrivateRoute>} />
          <Route path="/eee/thermocouple-pq" element={<PrivateRoute><ThermocouplePQNote /></PrivateRoute>} />
          <Route path="/eee/thermistor-pq" element={<PrivateRoute><ThermistorPQNote /></PrivateRoute>} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </div>
      </div>
      <ActiveUsersWidget />
    </div>
  );
}

function App() {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Disable native scroll restoration so reloads start at the top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
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
