import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Abi from "../contracts/Abi.json";
import { toast } from "sonner";

import config from '../config';

const contractAdd = config.CONTRACT_ADDRESS

const Login = ({ wallet }) => {
  const [walletConnected, setWalletConnected] = useState(false);

  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {

      if (window.ethereum.chainId === "0xaa36a7") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(contractAdd, Abi, signer);
          toast.success("Metamask connected");
          setWalletConnected(true);
          wallet(provider, contract, signer.address);

          const API_URL = config.BACKEND_APP_API_URL

          const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            // mode: 'no-cors',
            // credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "userAddress": signer.address })
          });
          const data = await response.json();
          window.localStorage.setItem("id", data._id)
          navigate("/home");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Please select SEPOLIA test network");
      }
    } else {
      toast.error("Please install metamask");
    }
  };

  const disconnectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      if (window.ethereum.chainId === "0x13881") {
        try {
          navigate("/");
          toast.warning("Metamask Disconnected");
          setWalletConnected(false);

        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Please select MUMBAI test network");
      }
    } else {
      toast.error("Please install metamask");
    }
  };

  return (

    <div className="w-[50%] h-[50%] -mt-10 md:mt-5 md:w-[100%] md:h-[90%] bg-slate-50 flex justify-center items-center  absolute md:relative dark:bg-slate-800  ">

      <div className="bg-black w-[90%] h-[80%] md:p-10 md:w-[70%] md:h-[95%] flex flex-col justify-center items-center space-y-20  rounded-xl dark:bg-slate-900 shadow-2xl  dark:shadow-cyan-500/50  ">
        <div className="flex items-center ">
          <img className="h-[80px] mb-2  " src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
            alt=""></img>
          <p className="text-lg font-bold text-white">Voting System</p>
        </div>

        <div>
          {walletConnected ?
            (
              <button className=" bg-[#4263EB] p-3 text-xl md:text-base  rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec]  transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            ) : (
              <button
                className=" bg-[#4263EB] p-3 text-xl md:text-base  rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec] transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}

        </div>
      </div>
    </div>

  );
};

export default Login;
