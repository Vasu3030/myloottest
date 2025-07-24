import { useParams } from "react-router-dom"
import { getTeamStats, getTeamInfo, getTeamLeaderboard } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import UserRow from "./components/userRow";
import LinkButton from "../components/LinkButton";
import DateFilter from "./components/dateFilter";
import ErrorPage from '../components/ErrorPage';
import { useState } from "react";

const TeamView = () => {
    const params = useParams();
    const [dateFilter, setDateFilter] = useState("");
    if (!params.teamId) return <p>Not found</p>

    const { teamInfo } = getTeamInfo(params.teamId);

    const { data, page, setPage, setPageSize, error } = dateFilter ?
        getTeamLeaderboard(params.teamId, dateFilter, 1, 10)
        : getTeamStats(params.teamId, 1, 10);

    if (!data || !teamInfo) return <ErrorPage message="No teams found" status='404' />;
    if (error) return <ErrorPage message={error} status='400' />;

    return (
        <div className='flex flex-col items-center p-10'>
            <LinkButton to="/" label="Home" />
            <h1 className='text-amber-300 font-bold text-3xl mb-10 mt-5'>{teamInfo.name}</h1>
            {data.users && data.users.length > 0 &&
                <>
                    <div className="my-2">
                        <DateFilter setDateFilter={setDateFilter} />
                    </div>
                    {data.users.map((user: any, index: number) => {

                        let bgColor = '#595959'; // default bg-color
                        let icon = '';
                        if (page === 1) {
                            if (index === 0) {
                                bgColor = '#ffb703'
                                icon = '🥇';
                            }
                            if (index === 1) {
                                bgColor = '#5a7582'
                                icon = '🥈';
                            }
                            if (index === 2) {
                                bgColor = '#62470a'
                                icon = '🥉';
                            }
                        }
                        
                        return (
                        <UserRow key={user.userId} data={user} bgColor={bgColor} icon={icon} />
                    );
                    })}

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
        </div>
    )
}

export default TeamView