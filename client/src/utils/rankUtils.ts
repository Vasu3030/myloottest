export function getRankData(index: number, page: number, pageSize: number) {
  const rank = (page - 1) * pageSize + (index + 1);

  let bgColor = '#595959'; // couleur par défaut
  let icon = '';

  if (page === 1) {
    if (index === 0) {
      bgColor = '#ffb703';
      icon = '🥇';
    } else if (index === 1) {
      bgColor = '#789ab7';
      icon = '🥈';
    } else if (index === 2) {
      bgColor = '#62470a';
      icon = '🥉';
    }
  }

  return { rank, bgColor, icon };
}