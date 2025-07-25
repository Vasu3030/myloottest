import { useParams } from "react-router-dom"
import { getUserInfo } from '../hooks/userHooks';
import ErrorPage from '../components/ErrorPage';
import Details from "./components/details";
import TeamSection from "./components/teamSection";
import { useState } from "react";
import AddCoinsForm from "./components/AddCoinsForm";

const UserDetailsView = () => {
  const params = useParams();
  // State to manage the amount of coins to add
  const [amount, setAmount] = useState<number>(0);
  // Fetch user information based on userId from URL parameters
  const { userInfo, loading } = getUserInfo(params.userId!, amount);

  // If userId is not provided or userInfo is not found, return an error page
  if (!params.userId) return <ErrorPage message={"Page not found"} status='404' />;
  if (!userInfo && !loading) return <ErrorPage message="User not found" status='404' />;


  return (
    <div className="flex flex-col mt-10">
      {userInfo &&
        <>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            {/* Display user details */}
            <Details
              pseudo={userInfo.pseudo}
              earningsSum={userInfo.earningsSum}
              percentage={userInfo.percentage}
            />

            {/* Display team section with name */}
            <TeamSection
              id={userInfo.team.id}
              name={userInfo.team.name} />
          </div>

          {/* Form to add coins to the user */}
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