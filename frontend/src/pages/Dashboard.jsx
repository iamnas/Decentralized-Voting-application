import React from "react";
import Navigation from "./Navigation";
import List from "../components/List";
import UserCard from "../components/UserCard";
import ElectionCard from "../components/ElectionCard";
import Winner from "../components/Winner";
import { useEffect, useState } from "react";
import  { toast } from 'sonner';


const Dashboard = ({ state, info, setinfo }) => {
  const [run, setRun] = useState(false);
  const [voted, setVoted] = useState(false);
  const [endTimeInUnix, setUnixTime] = useState()

  const [winnerInfo, setWinnerInfo] = useState({
    name: null,
  })

  const votedOrNot = async () => {
    try {
      const currentvoteId = await state?.contract?.nextVoteId()
      const check = await state?.contract?.voters(state?.signer, currentvoteId);
      setVoted(check[0]);
    } catch (error) {
      toast.error(error.reason)

    }
  }

  const setCandidates = async () => {

    const data = await state?.contract?.getVoteTallies()

    setinfo(data);

    if (typeof data == "undefined" || data.length === 0) {
      setRun(false);
    } else {
      setRun(true);
    }
  };

  useEffect(() => {
    setCandidates();
    compare()
    votedOrNot()
    // eslint-disable-next-line 
  }, [voted]);


  const getTime = async () => {
    try {
      const _endTime = Number(await state.contract.endTime());
      setUnixTime(_endTime)
    } catch (error) {
      // console.log(error);
    }
  };

  const compare = async () => {
    await getTime()

    let dte = new Date().getTime()
    dte = Math.floor(dte / 1000)
    if (endTimeInUnix > dte) {

    } else {
      try {
        const result = (await state.contract.winner())

        const name = result[1] 
        setWinnerInfo({ name })
        
      } catch (error) {
        console.log(error)
      }
    }
  };


  return (
    <div className="flex  h-[100%]   ">
      <Navigation state={state} />
      <div className=" p-4 w-full flex items-center ">
        <div className=" gap-5 w-[60%] h-[100%] flex flex-col justify-center p-[2rem]  " id="UserVotingStatus">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h1 className="mb-5 tracking-wide text-gray-600 dark:text-gray-400 text-2xl ">Candidates</h1>
            <div className=" w-[100%] gap-4">
              {/* Candidate detail cards start here */}
              {run ? (
                <div className="grid grid-rows-2 grid-flow-col gap-12 w-[100%] md:mb-10">
                  {info.map((candidate, index) => {
                    return (
                      <List
                        state={state}
                        key={index}
                        name={candidate.name}
                        id={index + 1}
                        setValue={true}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-rows-1 grid-flow-col gap-12 w-[100%] md:mb-10">
                  <List setValue={false} />
                </div>
              )}
              {/* Candidate detail cards start here */}
            </div>
          </div>
          {/* Winner starts here */}
          {winnerInfo?.name &&
            <div className=" w-[100%]  bg-white rounded-lg shadow-lg p-[2rem] ">
              <h1 className="mb-5 tracking-wide text-gray-600 dark:text-gray-400 text-2xl ">Winner</h1>
              <Winner winnerInfo={winnerInfo} />
            </div>}
          {/* Winner ends here */}

        </div>
        {/* Candidate detail cards ends */}

        {/* Election and user detail cards starts */}
        <div className=" w-[35%] h-[100%] p-4 flex flex-col space-y-10 " id="UserVotingStatus">

          <ElectionCard state={state} info={info} />

          <UserCard voted={voted} state={state} />

        </div>
        {/* Election and user detail cards ends */}

      </div>
    </div>
  );
};

export default Dashboard;
