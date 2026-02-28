import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { connectWallet } from '../hooks/useWeb3';

const AdminDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const { contract } = await connectWallet();
      const count = await contract.proposalCount();
      const localMetadata = JSON.parse(localStorage.getItem('proposals') || '[]');

      const allProposals = [];
      for (let i = 1; i <= count; i++) {
        const onChainData = await contract.proposals(i);
        const metadata = localMetadata.find(p => p.id === i.toString());

        allProposals.push({
          id: i,
          proposer: onChainData.proposer,
          amount: onChainData.requestedAmount.toString(),
          status: Number(onChainData.status),
          title: metadata ? metadata.title : "Unknown Project",
          description: metadata ? metadata.description : "Description stored on another device."
        });
      }
      setProposals(allProposals.reverse());
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setApprovingId(id); 
    try {
      const { contract } = await connectWallet();
      const tx = await contract.approveAndFund(id, {
        maxFeePerGas: ethers.parseUnits("30", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("30", "gwei")
      });
      await tx.wait(); 
      fetchProposals(); 
    } catch (error) {
      alert("Approval failed. Ensure you are connected as the Admin.");
    } finally {
      setApprovingId(null); 
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center mt-32">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
      <p className="text-cyan-400 font-medium animate-pulse tracking-widest uppercase">Syncing Blockchain State...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="grid gap-8">
        {proposals.map((p) => (
          <div key={p.id} className="relative p-6 bg-[#0d1322]/80 backdrop-blur-lg rounded-xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all">
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-500/30">ID #{p.id}</span>
                <h3 className="text-2xl font-bold text-white mt-3">{p.title}</h3>
                <p className="text-gray-500 text-xs font-mono mt-1">By: {p.proposer}</p>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <p className="text-2xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                  (🪙) {p.amount} <span className="text-sm font-medium text-amber-200/70">Tokens</span>
                </p>
                <div className="mt-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    p.status === 1 
                      ? 'bg-green-900/40 text-green-400 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                      : 'bg-amber-900/40 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  }`}>
                    {p.status === 1 ? "✓ Disbursed" : "Pending Review"}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">{p.description}</p>
            
            {p.status === 0 && (
              <button 
                onClick={() => handleApprove(p.id)}
                disabled={approvingId === p.id}
                className={`mt-6 w-full py-3 rounded-lg font-bold tracking-widest uppercase transition-all duration-300 border ${
                  approvingId === p.id 
                    ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#1e3a8a] to-[#581c87] hover:from-[#1d4ed8] hover:to-[#7e22ce] text-white border-purple-500/50 shadow-[0_0_15px_rgba(126,34,206,0.4)]'
                }`}
              >
                {approvingId === p.id ? "Confirming..." : "Approve & Release Funds"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;