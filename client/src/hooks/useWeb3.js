import { ethers } from "ethers";
import FundwatcherABI from "../contracts/Fundwatcher.json";

// PASTE YOUR REMIX CONTRACT ADDRESS HERE
const CONTRACT_ADDRESS = "0x63aaE9CC8A3fBEa3A0ea3CDd2A35B504DaD25dc0";

export const connectWallet = async () => {
  if (!window.ethereum) return alert("Please install MetaMask!");
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    FundwatcherABI,
    signer
  );

  return { signer, contract, address: await signer.getAddress() };
};