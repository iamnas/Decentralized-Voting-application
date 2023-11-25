// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import { Toaster, toast } from 'sonner';
// import Navigation from './pages/Navigation';
import Dashboard from './pages/Dashboard.jsx';
import Candidate from './pages/Candidate.jsx';
import Voter from './pages/Voter.jsx';
import VotingCommission from './pages/VotingComission.jsx';



function App() {

  const [state, setState] = useState({
    provider: null,
    contract: null,
    signer: null
  });

  const [info, setInfo] = useState()

  const [pIdEc, setPIdEc] = useState({       //Pid is short for current poll id and Ec is for election commsion 
    pollId: null,
    EcAddress: null
  })

  const setinfo = async (data) => {
    setInfo(data)
  }

  const details = async (_pollId, _EcAddress) => {
    setPIdEc({ pollId: _pollId, EcAddress: _EcAddress })
  }

  const wallet = async (provider, contract, signer) => {   //this function sets the provider and signer or EOA address of the client that has logged in 
    setState({ provider: provider, contract: contract, signer: signer })
  }

  const checkLogin = () => {
    // const stat = await state
    if (state.provider === null || state.contract === null || state.signer === null) {
      toast.error("Please login again")
      return false
    }
    return true;
  }

  const handleCase = (name) => {    //For converting the case , First letter upper case and rest lower case
    let temp = name.slice(0, 1)
    let temp1 = name.slice(1, name.length)
    temp = temp.toUpperCase()
    temp1 = temp1.toLowerCase()
    return (temp + temp1)
  }

  useEffect(() => {
    checkLogin()
    // eslint-disable-next-line 
  }, [])

  return (
    <>
      <div className="bg-slate-50 w-full h-screen dark:bg-slate-800  overflow-hidden transition-colors duration-700 ">

        <Router>
          <Routes>
            <Route path="/" element={<Login wallet={wallet} />} />
            <Route path="/home" element={<Dashboard state={state} info={info} details={details} setinfo={setinfo} pIdEc={pIdEc} />} /> :<Route path="/" element={<Login wallet={wallet} />} />
            <Route path="/Candidate" element={<Candidate state={state} handleCase={handleCase} />} />
            <Route path="/Voter" element={<Voter state={state} handleCase={handleCase} />} />
            <Route path="/VotingCommission" element={<VotingCommission state={state} handleCase={handleCase} />} />
          </Routes>
        </Router>
        <Toaster richColors position="top-center" closeButton />
      </div>
    </>
  );
}

export default App;
