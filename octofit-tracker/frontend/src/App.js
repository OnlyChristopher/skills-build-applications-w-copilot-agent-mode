
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-dark">
            <div className="container">
              <NavLink className="navbar-brand fw-semibold" to="/">
                <img src="/octofitapp-small.png" alt="Octofit Logo" className="App-logo" />
                Octofit Tracker
              </NavLink>
              <ul className="navbar-nav flex-row gap-3">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route
              path="/"
              element={(
                <div className="container py-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h2 className="h3 mb-2">Welcome to Octofit Tracker</h2>
                      <p className="text-muted mb-3">
                        Track activities, compare team performance, and explore workouts with live data from the Octofit API.
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        <NavLink className="btn btn-primary" to="/activities">View Activities</NavLink>
                        <NavLink className="btn btn-outline-secondary" to="/leaderboard">See Leaderboard</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
