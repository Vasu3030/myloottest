import { useParams } from "react-router-dom"
import { getTeamStats, getTeamLeaderboard, getTeamTimeline } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import UserRow from "./components/userRow";
import DateFilter from "./components/dateFilter";
import ErrorPage from '../components/ErrorPage';
import TeamHeader from "./components/teamHeader";
import TimelineChart from "../components/TimelineChart";
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

    const { dataTimeline, loadingTimeline, offset, setOffset } = getTeamTimeline(params.teamId, 0);

    return (
        <div className='flex flex-col items-center'>
            {data && data.name && <>
                {/* Team Header with name and total coins */}
                <TeamHeader name={data.name} totalCoins={data.totalCoins} />
                {/* Timeline chart for team coins over time */}
                        {dataTimeline && dataTimeline.data && dataTimeline.data.length > 0 && !loadingTimeline && !loading &&
                            <div className="w-full max-w-4xl mt-6">
                                <TimelineChart
                                    title={`Coins per day`}
                                    data={dataTimeline.data}
                                    monthInfo={dataTimeline.month}
                                    yearInfo={dataTimeline.year}
                                    offset={offset}
                                    setOffset={setOffset} />
                            </div>
                        }
                {data.users && data.users.length > 0 && !loading && !loadingTimeline &&
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