import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [address, setAddress] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) setAddress(accounts[0]);
      }
    };
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) setAddress(accounts[0]);
        else setAddress(null);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  const formatAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  const navLinkStyle = (path) => `
    uppercase tracking-wider text-sm font-bold transition-all duration-300
    ${location.pathname === path 
      ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
      : 'text-gray-400 hover:text-cyan-300'}
  `;

  return (
    <nav className="bg-[#0a0f1c]/90 backdrop-blur-md border-b border-purple-900/50 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Glowing Gradient Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
            FUNDWATCHER
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-10">
          <Link to="/" className={navLinkStyle("/")}>Submit Proposal</Link>
          <Link to="/admin" className={navLinkStyle("/admin")}>Admin Panel</Link>
          
          {/* Cyberpunk Wallet Badge */}
          {address ? (
            <div className="px-4 py-2 bg-[#06241b] border border-green-500 rounded-lg font-mono text-sm font-bold text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse shadow-[0_0_5px_#4ade80]"></div>
              {formatAddress(address)}
              {/* Decorative hexagon icon */}
              <svg className="w-4 h-4 ml-3 text-green-500 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          ) : (
            <button 
              onClick={connectWallet} 
              className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all uppercase tracking-wide text-sm"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;