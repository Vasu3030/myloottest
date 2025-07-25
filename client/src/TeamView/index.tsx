import { useParams } from "react-router-dom"
import { getTeamStats, getTeamInfo, getTeamLeaderboard } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import UserRow from "./components/userRow";
import DateFilter from "./components/dateFilter";
import ErrorPage from '../components/ErrorPage';
import TeamHeader from "./components/teamHeader";
import { useState } from "react";
import { getRankData } from "../utils/rankUtils";

const TeamView = () => {
    const params = useParams();
    const [dateFilter, setDateFilter] = useState("");
    if (!params.teamId) return <ErrorPage message={"Page not found"} status='404' />;
    
    const { teamInfo } = getTeamInfo(params.teamId);

    const { data, page, setPage, setPageSize, error, loading } = dateFilter ?
        getTeamLeaderboard(params.teamId, dateFilter, 1, 10)
        : getTeamStats(params.teamId, 1, 10);

    if ((!data || !teamInfo) && !loading) return <ErrorPage message="No teams found" status='404' />;
    if (error) return <ErrorPage message={error} status='400' />;

    return (
        <div className='flex flex-col items-center'>
            {teamInfo && data && <>
            <TeamHeader name={teamInfo.name} totalCoins={teamInfo.totalCoins} />
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