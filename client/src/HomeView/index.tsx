import { getTeams } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import TeamRow from './components/teamRow';
import ErrorPage from '../components/ErrorPage';
import { getRankData } from '../utils/rankUtils';

export default function TeamsListPage() {
    const { data, page, setPage, setPageSize, loading } = getTeams(1, 10);

    if (!data && !loading) return <ErrorPage message="No teams found" status='404' />;

    return (
        <div className='flex flex-col items-center p-10'>
            <h1 className='text-amber-300 font-bold text-3xl mb-10 mt-5'>TEAMS LADDER</h1>
            {data && <>
                {/* List of teams */}
                {data.teams.map((team: any, index: number) => {
                    const { rank, bgColor, icon } = getRankData(index, page, data.pageSize);

                    return <TeamRow key={team.id} data={team} bgColor={bgColor} icon={icon} rank={rank} />;
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
            </>}
        </div>
    );
}
