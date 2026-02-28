import { ethers } from 'ethers';
import React, { useState } from 'react';
import { connectWallet } from '../hooks/useWeb3';

const SubmitProposal = () => {
  const [formData, setFormData] = useState({ title: '', amount: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { contract } = await connectWallet();
      const amountInWei = BigInt(formData.amount); 
      const tx = await contract.submitProposal(amountInWei, {
        maxFeePerGas: ethers.parseUnits("30", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("30", "gwei")
      });
      const receipt = await tx.wait();
      const proposalId = receipt.logs[0].args[0].toString();

      const metadata = { id: proposalId, title: formData.title, description: formData.description, timestamp: new Date().toISOString() };
      const existingData = JSON.parse(localStorage.getItem('proposals') || '[]');
      localStorage.setItem('proposals', JSON.stringify([...existingData, metadata]));

      alert(`✅ PROPOSAL ID #${proposalId} CREATED\nSuccessfully submitted to the blockchain!`);
      setFormData({ title: '', amount: '', description: '' });
    } catch (error) {
      alert("Submission failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-[#0d1322] rounded-xl border border-cyan-500 shadow-2xl shadow-cyan-500/40 relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

      <h2 className="text-3xl font-bold text-white mb-1">Submit Budget Proposal</h2>
      <p className="text-purple-400 text-sm tracking-widest uppercase mb-8 font-semibold">Web3 Disbursement Platform</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="flex items-center text-sm font-medium text-cyan-300 mb-2">
            <span className="mr-2">📝</span> Project Title
          </label>
          <input 
            type="text" required
            className="w-full p-3 bg-[#151c2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-cyan-300 mb-2">
            <span className="mr-2">🪙</span> Requested Amount (Tokens)
          </label>
          <input 
            type="number" required
            className="w-full p-3 bg-[#151c2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-cyan-300 mb-2">
            <span className="mr-2">📄</span> Detailed Justification
          </label>
          <textarea 
            rows="4" required
            className="w-full p-3 bg-[#151c2f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>
       
     <button 
         type="submit" 
         disabled={loading}
         className={`w-full py-4 rounded-lg text-white font-black tracking-widest uppercase transition-all duration-300 border border-transparent
           ${loading 
             ? 'bg-gray-700 cursor-not-allowed' 
             : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-cyan-500/50'}`}
       >
         {/* THIS IS THE MISSING LINE! 👇 */}
         {loading ? "Processing Transaction..." : "Submit to Blockchain"}
       </button>
      </form>
    </div>
  );
};

export default SubmitProposal;