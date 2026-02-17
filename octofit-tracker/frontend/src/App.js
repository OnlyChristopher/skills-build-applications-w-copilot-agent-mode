
import { Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './pages/Activities';
import Leaderboard from './pages/Leaderboard';
import Teams from './pages/Teams';
import Users from './pages/Users';
import Workouts from './pages/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Octofit Tracker</h1>
          <nav>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/teams">Teams</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/workouts">Workouts</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<h2>Welcome to Octofit Tracker!</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
