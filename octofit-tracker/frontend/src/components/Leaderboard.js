import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const items = data.results ? data.results : data;
        setLeaderboard(items);
        console.log('Fetched Leaderboard:', items);
      })
      .catch(err => console.error('Error fetching Leaderboard:', err));
  }, [endpoint]);


  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, idx) => (
          <li key={idx}>{JSON.stringify(entry)}</li>
        ))}
      </ul>
    </div>
  );
};
export default Leaderboard;
export default Leaderboard;
