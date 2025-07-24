import { getTeams } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import TeamRow from './components/teamRow';
import ErrorPage from '../components/ErrorPage';

export default function TeamsListPage() {
    const { data, page, setPage, setPageSize } = getTeams(1, 10);

    if (!data) return <ErrorPage message="No teams found" status='404'/>;

    return (
        <div className='flex flex-col items-center p-10'>
            <h1 className='text-amber-300 font-bold text-3xl mb-10 mt-5'>TEAMS LADDER</h1>

            {data.teams.map((team: any, index: number) => {
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

                return <TeamRow key={team.id} data={team} bgColor={bgColor} icon={icon}/>;
            })}

            <Pagination
                page={page}
                totalPages={data.totalPages}
                totalItems={data.total}
                pageSize={data.pageSize}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
}
