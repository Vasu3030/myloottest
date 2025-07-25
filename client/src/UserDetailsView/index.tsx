import { useParams } from "react-router-dom"
import { getUserInfo } from '../hooks/userHooks';
import ErrorPage from '../components/ErrorPage';
import Details from "./components/details";
import TeamSection from "./components/teamSection";
import { useState } from "react";
import AddCoinsForm from "./components/AddCoinsForm";

const UserDetailsView = () => {
  const params = useParams();
  const [amount, setAmount] = useState<number>(0);
  const { userInfo, loading } = getUserInfo(params.userId!, amount);

  if (!params.userId) return <ErrorPage message={"Page not found"} status='404' />;
  if (!userInfo && !loading) return <ErrorPage message="User not found" status='404' />;


  return (
    <div className="flex flex-col mt-10">
      {userInfo &&
        <>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            <Details
              pseudo={userInfo.pseudo}
              earningsSum={userInfo.earningsSum}
              percentage={userInfo.percentage}
            />
            <TeamSection
              id={userInfo.team.id}
              name={userInfo.team.name} />
          </div>
          <AddCoinsForm
            userId={userInfo.id}
            teamId={userInfo.team.id}
            amount={amount}
            setAmount={setAmount}
          />
        </>
      }
    </div>
  )
}

export default UserDetailsView