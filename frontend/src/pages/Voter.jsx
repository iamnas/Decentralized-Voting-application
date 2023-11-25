import React from "react";
import Navigation from "./Navigation";
import { toast } from 'sonner';

import config from '../config';

const Voter = ({ state, handleCase }) => {

  const handleVoterInfo = async (event) => {
    event.preventDefault();
    const voterInfo = {
      name: handleCase(document.querySelector("#nameV").value),
      age: handleCase(document.querySelector("#ageV").value),
      gender: handleCase(document.querySelector("#genderV").value),
      discordID: handleCase(document.querySelector("#discordIDV").value),
      userAddress: state.signer
    };

    try {
      const API_URL = config.BACKEND_APP_API_URL
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voterInfo)
      });
      const data = await response.json();
      document.querySelector("#nameV").value = ''
      document.querySelector("#ageV").value = ''
      document.querySelector("#genderV").value = ''
      document.querySelector("#discordIDV").value = ''

      toast.success(`Voter ${data.name} registered succesfully`)

    } catch (error) {
      toast.error(error.reason || error.message)
    }
    console.log(voterInfo.name, voterInfo.age, voterInfo.gender);
  };

  const handleVoting = async (event) => {
    event.preventDefault();
    if (event.target.elements.candidate_Id.value) {

      const candidateId = document.querySelector("#candidateId").value - 1;

      try {
        const tx = await state?.contract?.vote?.send(candidateId);
        tx.wait();
        toast.success("User voted successfully");
      } catch (error) {
        console.error(error);
        toast.error(error.reason)
      }
    } else {
      toast.error("Please enter candidate id");
    }

  };

  return (
    <>
      <div className="flex  h-[100%] space-x-32">

        <Navigation state={state} />

        <div className="w-full  h-[100vh]  flex justify-center items-center">
          <div className="flex justify-center gap-x-6   ">
            {/* voter registration starts */}
            <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-5">
              <h1 className="tracking-wide text-gray-600 dark:text-gray-400 text-2xl mb-5">
                Voter Registration
              </h1>
              {/* Form for voter registraation starts here */}
              <form className=" justify-center" onSubmit={handleVoterInfo}>
                <div className="grid grid-rows-4 grid-flow-col gap-4 ">
                  <div >
                    <input className=" w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px]" placeholder='Enter name' name='nameV' id='nameV'></input>
                  </div>

                  <div >
                    <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px] " type="number" placeholder='Enter age' name='ageV' id='ageV' ></input>
                  </div>

                  <div >
                    <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px] " placeholder='Enter gender' name='genderV' id='genderV'></input>
                  </div>

                  <div >
                    <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px] " placeholder='Enter discordID' name='discordIDV' id='discordIDV'></input>
                  </div>

                </div>

                {/* Button */}
                <div className=' rounded-3xl p-px  mt-5'>
                  <button className="relative rounded-lg  outline-none border-[rgba(0,167,111,0.2)]  text-[rgb(0,167,111)]  hover:bg-[rgba(0,167,111,0.2)]  border-[1px] items-center justify-center  p-0.5   overflow-hidden text-sm font-medium  group bg-gradient-to-br  ransition-all  duration-200 " type='submit'>
                    <span className="relative w-[300px] h-[50px] flex justify-center items-center text-lg transition-all ease-in-out duration-700 bg-white dark:bg-gray-900  group-hover:bg-opacity-0">
                      Register
                    </span>
                  </button>
                </div>
              </form>
              {/* Form for voter registraation ends here */}

            </div>
            {/* voter registration ends */}

            {/* Vote starts */}
            <div className="flex flex-col h-max  items-center  bg-white rounded-xl shadow-lg p-5">
              <h1 className=" tracking-wide text-gray-600 dark:text-gray-400 text-2xl mb-5 ">
                Vote
              </h1>
              {/* Vote form starts here */}
              <form className=" " onSubmit={handleVoting}>
                <div className="grid grid-rows-1 grid-flow-col ">
                  <div >
                    <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px] " placeholder='Enter Candidate Id' name='candidate_Id' id='candidateId' type='number' ></input>
                  </div>
                </div>
                {/* Button */}
                <div className='w-[100%] rounded-3xl p-px mt-5 '>
                  <button className="relative rounded-lg  outline-none border-[rgba(0,167,111,0.2)]  text-[rgb(0,167,111)]  hover:bg-[rgba(0,167,111,0.2)]  border-[1px] items-center justify-center  p-0.5  overflow-hidden text-sm font-medium  group bg-gradient-to-br  ransition-all  duration-200 " type='submit'>
                    <span className="relative w-[300px] h-[50px] flex justify-center items-center text-lg transition-all ease-in-out duration-700 bg-white dark:bg-gray-900  group-hover:bg-opacity-0">
                      Vote
                    </span>
                  </button>
                </div>

              </form>
              {/* Vote form starts here */}
            </div>
            {/* Vote Ends */}

          </div>
        </div>
      </div>
    </>
  );
};

export default Voter;
