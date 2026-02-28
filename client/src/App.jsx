import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubmitProposal from './pages/SubmitProposal';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      {/* REMOVED bg-gray-50 and added text-gray-200 so the dark theme works */}
      <div className="min-h-screen text-gray-200 flex flex-col">
        <Navbar />
        
        {/* Expanded the container and removed fixed widths so it breathes */}
        <main className="flex-grow w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<SubmitProposal />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;