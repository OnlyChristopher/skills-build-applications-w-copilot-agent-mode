import React, { useEffect, useMemo, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => {
        const items = Array.isArray(data) ? data : (data.results || []);
        console.log('Leaderboard data:', data);
        console.log('Leaderboard items:', items);
        setLeaderboard(items);
      })
      .catch(err => console.error('Error fetching Leaderboard:', err));
  }, [endpoint, reloadKey]);

  const filteredLeaderboard = useMemo(() => {
    if (!query) {
      return leaderboard;
    }
    const lowered = query.toLowerCase();
    return leaderboard.filter(entry => JSON.stringify(entry).toLowerCase().includes(lowered));
  }, [leaderboard, query]);

  const columns = filteredLeaderboard.length > 0 ? Object.keys(filteredLeaderboard[0]) : [];
  const formatValue = value => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">{endpoint}</a>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="button" onClick={() => setReloadKey(key => key + 1)}>Refresh</button>
            <button className="btn btn-outline-secondary" type="button" onClick={() => setShowModal(true)}>About</button>
          </div>
        </div>
        <div className="card-body">
          <form
            className="row g-2 align-items-center mb-3"
            onSubmit={event => event.preventDefault()}
          >
            <div className="col-sm">
              <input
                className="form-control"
                placeholder="Filter leaderboard"
                value={query}
                onChange={event => setQuery(event.target.value)}
              />
            </div>
            <div className="col-sm-auto">
              <button className="btn btn-outline-primary" type="submit">Filter</button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  {columns.length === 0 ? (
                    <th scope="col">Data</th>
                  ) : (
                    columns.map(column => (
                      <th scope="col" key={column}>{column}</th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={Math.max(columns.length, 1)} className="text-muted">No leaderboard entries available.</td>
                  </tr>
                ) : (
                  filteredLeaderboard.map((entry, idx) => (
                    <tr key={entry.id || idx}>
                      {columns.map(column => (
                        <td key={column}>{formatValue(entry[column])}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal show d-block" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">About Leaderboard</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <p className="mb-2">Displaying {filteredLeaderboard.length} entries from the Octofit API.</p>
                  <p className="mb-0 text-muted">Refresh to pull the latest rankings.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
};
export default Leaderboard;
