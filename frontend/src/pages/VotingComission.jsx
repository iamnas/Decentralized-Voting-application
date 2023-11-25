import React from 'react'
import Navigation from "./Navigation"
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";


const ElectionCommission = ({ state }) => {

  const navigate = useNavigate();

  const handleElection = async (event) => {
    event.preventDefault()
    const start = document.querySelector("#startT").value
    const end = document.querySelector("#endT").value
    const date = new Date()
    try {
      const tx = await state.contract.setVoteTime.send(start, end)
      await tx.wait()
      toast.success("Voting has been initialised", { description: `${date.toString().slice(0, 3)}, ${date.toString().slice(4, 7)} ${date.getDate()} at ${date.toLocaleTimeString()} ` })
      document.querySelector("#startT").value = ''
      document.querySelector("#endT").value = ''
    } catch (error) {

      toast.error(error.reason)
    }

  }

  const handleResult = async () => {
    try {
      const tx = await state.contract.result()
      await tx.wait()
      toast.success("Result has been declared")
      await fetch('http://127.0.0.1:3333/api/v1/bot/sendWinnerNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      navigate("/home");

    } catch (error) {
      toast.error(error.reason)
    }
  }

  return (
    <div className='flex  h-[100%]  space-x-12 '>

      <Navigation state={state} />

      <div className="w-[100%] h-[70%]">
        <div className="flex flex-col justify-center items-center mt-[10%]">
          <h1 className="mb-10 tracking-wide text-gray-600 dark:text-gray-400 text-2xl ">
            Enter Vote Timing (In seconds)
          </h1>
          {/* Form starts of Vote time */}
          <form className="" onSubmit={handleElection}>
            <div className="grid grid-rows-2 grid-flow-col gap-5">
              <div >
                <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px]" placeholder="Start time in seconds" name="" id="startT" ></input>
              </div>
              <div >
                <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px]" placeholder="End time in seconds" name="" id="endT"  ></input>
              </div>
            </div>
            <div className=' rounded-3xl p-px  mt-5'>
              <button className="relative rounded-lg  outline-none border-[rgba(0,167,111,0.2)]  text-[rgb(0,167,111)]  hover:bg-[rgba(0,167,111,0.2)]  border-[1px] items-center justify-center  p-0.5   overflow-hidden text-sm font-medium  group bg-gradient-to-br  ransition-all  duration-200 " type='submit'>
                <span className="relative w-[300px] h-[50px] flex justify-center items-center text-lg transition-all ease-in-out duration-700 bg-white dark:bg-gray-900  group-hover:bg-opacity-0">
                  Start Voting
                </span>
              </button>
            </div>
          </form>

          <hr className='my-5 ' />
          {/* Form ends here Of Vote Time  */}

          {/* Emergency and Result buttons starts here */}

          <div className='flex justify-around items-center'>
            {/* <button onClick={handleEmergency} className=" text-red-600 hover:text-white border border-red-600  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 hover:bg-red-600 shadow-2xl transition-all ease-in-out" type='submit'>Emergency</button> */}

            <div className=' rounded-3xl p-px  mt-5'>
              <button  onClick={handleResult} className="relative rounded-lg  outline-none border-[rgba(0,167,111,0.2)]  text-[rgb(0,167,111)]  hover:bg-[rgba(0,167,111,0.2)]  border-[1px] items-center justify-center  p-0.5   overflow-hidden text-sm font-medium  group bg-gradient-to-br  ransition-all  duration-200 " type='submit'>
                <span className="relative w-[300px] h-[50px] flex justify-center items-center text-lg transition-all ease-in-out duration-700 bg-white dark:bg-gray-900  group-hover:bg-opacity-0">
                  Result
                </span>
              </button>
            </div>
          </div>

          {/* Emergency and Result buttons ends here */}

        </div>
        {/* voting  time ends */}


      </div>
    </div>
  )
}

export default ElectionCommission
