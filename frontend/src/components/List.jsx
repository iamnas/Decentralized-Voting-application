import React from "react";
import Button from "./Button";
import { useEffect, useState } from "react";

const List = ({ state, name, id, setValue }) => {

  const [fill, setFill] = useState(false);

  useEffect(() => {
    setFill(setValue);
  }, [fill]);

  return (
    <>
      <div className="w-[100%]  border-[1px] hover:shadow-lg bg-white rounded-xl   ">
        <div className=" p-6  w-full  ">
          {fill ? (
            <div className="flex gap-4 items-center justify-around">
              <div>
                <h3 className="text-lg font-light text-gray-700 dark:text-gray-600">
                  Candidate Id
                </h3>
                <span className="text-sm tracking-wide flex justify-center items-center text-gray-600 ">
                  {id}
                </span>
              </div>

              <div>
                {/* <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                  NAME
                </h3> */}
                <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                  NAME
                </span>
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                  {name}
                </h3>
              </div>

              {/* <Link to="/Voter" > */}
              <Button id={id} candidateName={name} event="Vote" state={state} />
              {/* </Link> */}
            </div>
          ) : (
            <div className="flex gap-4 items-center justify-around">
              {/* <h3 className="text-lg font-medium text-gray-700 dark:text-white"></h3> */}
              <span className="text-md tracking-wide text-gray-600 dark:text-gray-400">
                Candidates have not registered yet !!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
