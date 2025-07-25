import { useParams } from "react-router-dom"
import { getTeamStats, getTeamLeaderboard } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import UserRow from "./components/userRow";
import DateFilter from "./components/dateFilter";
import ErrorPage from '../components/ErrorPage';
import TeamHeader from "./components/teamHeader";
import { useState } from "react";
import { getRankData } from "../utils/rankUtils";

const TeamView = () => {
    const [dateFilter, setDateFilter] = useState("");

    // Get teamId from URL parameters and return 404 if teamId is not provided
    const params = useParams();
    if (!params.teamId) return <ErrorPage message={"Page not found"} status='404' />;

    // Fetch team stats or leaderboard based on date filter
    // If dateFilter is set, fetch leaderboard, otherwise fetch stats
    const { data, page, setPage, setPageSize, loading } = dateFilter ?
        getTeamLeaderboard(params.teamId, dateFilter, 1, 10)
        : getTeamStats(params.teamId, 1, 10);

    // If no data is found return an error page
    if (!data?.name && !loading) return <ErrorPage message="No teams found" status='400' />;

    return (
        <div className='flex flex-col items-center'>
            {data && data.name && <>
                {/* Team Header with name and total coins */}
                <TeamHeader name={data.name} totalCoins={data.totalCoins} />
                {data.users && data.users.length > 0 &&
                    <>
                        {/* Date filter  */}
                        <div className="my-2">
                            <DateFilter setDateFilter={setDateFilter} />
                        </div>
                        {/* List of users */}
                        {data.users.map((user: any, index: number) => {
                            const { rank, bgColor, icon } = getRankData(index, page, data.pageSize);

                            return (
                                <UserRow key={user.userId} data={user} bgColor={bgColor} icon={icon} rank={rank} />
                            );
                        })}

                        {/* Pagination */}
                        <Pagination
                            page={page}
                            totalPages={data.totalPages}
                            totalItems={data.total}
                            pageSize={data.pageSize}
                            onPageChange={setPage}
                            onPageSizeChange={setPageSize}
                        />
                    </>
                }
            </>}
        </div>
    )
}

export default TeamView