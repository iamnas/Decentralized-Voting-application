import React from "react";
import  { toast } from 'sonner';

import config from '../config';

const Button = ({ event,id,candidateName ,state}) => {
  const vote= async ()=>{
      try {
        const tx = await state.contract.vote.send(id-1)
        await tx.wait()
        toast.success("You have successfully Voted")

        const payload = {
          "userAddress": state.signer,
          "candidateName": candidateName
        }
        const API_URL = config.BACKEND_APP_API_URL
        const response = await fetch(`${API_URL}/bot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        await response.json();
      } catch (error){
        toast.error(error.reason)
      }
  }

  return (
    <button onClick={vote} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-normal rounded-2xl transition-all hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50 duration-700">
      {event}
    </button>
  );
};

export default Button;
