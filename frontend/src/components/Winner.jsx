import React from 'react'


const Winner = ({ winnerInfo }) => {

  return (
    <>
      <div className="w-[100%]   border-[1px] hover:shadow-lg bg-white rounded-xl ">
        <div className=" p-6 w-[100%] ">
          <div className="flex gap-4 items-center justify-around">
            {/* party and name starts here  */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                WINNER
              </h3>
            </div>
            <div>
              <h3 className="text-lg font-light text-gray-700 dark:text-gray-600">
                {winnerInfo.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Winner
