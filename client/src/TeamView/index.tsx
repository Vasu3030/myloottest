import { Link, useParams } from "react-router-dom"
import { getTeamStats } from '../hooks/teamHooks';
import Pagination from '../components/Pagination';
import UserRow from "./components/userRow";


const TeamView = () => {
    const params = useParams();
    if (!params.teamId) return <p>Not found</p>

    const { data, page, setPage, setPageSize } = getTeamStats(params.teamId, 1, 10);

    if (!data) return <p>No data</p>;
    if (!data.users) return <p>No members</p>;

    return (
        <div className='flex flex-col items-center p-10'>
            <h1 className='text-amber-300 font-bold text-3xl mb-10 mt-5'>Team ladder</h1>

            {data.users.map((user: any, index: number) => {

                let bgColor = '#595959'; // par défaut
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

                return <UserRow key={user.id} data={user} bgColor={bgColor} icon={icon} />;
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
    )
}

export default TeamView