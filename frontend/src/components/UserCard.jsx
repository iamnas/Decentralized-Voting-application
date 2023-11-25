import React from "react";

const Card = ({ voted ,state }) => {

  return (
    <div className="w-[90%] shadow-xl  rounded-2xl p-px  ">
      <div className=" p-6 w-[100%] bg-white dark:bg-gray-900">
        <div className="flex flex-col gap-4 justify-start">
          <div className="col-span-3 ">
            <p className="text-md font-semibold tracking-wide ">User Info</p>
          </div>
          <div className="col-span-3 flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-600  dark:text-gray-400 tracking-wide">
              User Address:
            </h3>
            {state.signer ? (
              <span className="text-sm font-light tracking-wide text-[#2ABB94] break-all">
                {state.signer}
              </span>
            ) : (
              <span className="text-sm font-light tracking-wide text-[#F784AD]">
                Please Connect your Wallet
              </span>
            )}
          </div>

          <div className="col-span-3 flex  items-center gap-2 ">
            <h3 className="text-sm font-medium text-gray-600  dark:text-gray-400 tracking-wide">
              Voted:
            </h3>
            {voted ? (
              <span className="text-sm font-light tracking-wide text-[#2ABB94]">
                Voted
              </span>
            ) : (
              <span className="text-sm font-light tracking-wide text-[#F784AD]">
                Not Voted
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
