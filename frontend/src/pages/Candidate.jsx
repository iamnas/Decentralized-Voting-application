import React from 'react'
import Navigation from "./Navigation"
import { toast } from 'sonner';


const Candidate = ({ state, handleCase }) => {


  const handleInfo = async (event) => {
    event.preventDefault()
    if (event.target.elements.name.value) {
      const candidatesInfo = {
        name: handleCase(document.querySelector("#name").value),
      }

      const payload = {
        "candidateName": candidatesInfo.name
      }

      try {
        const tx = await state.contract.addCandidate.send(candidatesInfo.name)
        await tx.wait()
        toast.success(`Candidate ${candidatesInfo.name} registered successfully`)
        document.querySelector("#name").value = ''
        await fetch('http://127.0.0.1:3333/api/v1/bot/sendCandidateRegisteredNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)

        });

      } catch (error) {
        console.log(error)
        toast.error(error.reason)
      }
    } else {
      toast.error(`Please enter registration name`)
    }
  }


  return (
    <div className="flex  h-[100%] space-x-32">

      <Navigation state={state} />

      <div className="w-[60%] h-[70%]">
        <div className="flex flex-col justify-center items-center mt-[10%] bg-white rounded-xl shadow-lg p-4" >
          <h1 className="mb-10 tracking-wide text-gray-600 dark:text-gray-400 text-2xl font-semibold ">Candidate Registration</h1>

          {/* Forms starts */}
          <form className=" text-center flex flex-col items-center gap-7" onSubmit={handleInfo}>
            <div className=' gap-10 items-center'>
              <div className="w-[100%]   min-w-[500px]    p-px  ">
                <input className="w-[100%] focus:border-[rgba(0,167,111,0.2)]  border-[1px] rounded-lg  px-4 outline-none   h-[50px]  " placeholder="Enter name " name="name" id="name" ></input>
              </div>
            </div>

            <div className='   flex justify-center items-center'>
              <button className="relative rounded-lg  outline-none border-[rgba(0,167,111,0.2)]  text-[rgb(0,167,111)]  hover:bg-[rgba(0,167,111,0.2)]  border-[1px] items-center justify-center  p-0.5  mb-2 overflow-hidden text-sm font-medium  group bg-gradient-to-br  ransition-all  duration-200 " type='submit'>
                <span className="relative w-[300px] h-[50px] flex justify-center items-center text-lg transition-all ease-in-out duration-700 bg-white dark:bg-gray-900  group-hover:bg-opacity-0">
                  Register
                </span>
              </button>
            </div>

          </form>
          {/* Form ends */}

        </div>
      </div>
    </div>
  )
}

export default Candidate
