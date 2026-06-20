import { useEffect, useState } from 'react';
import { listSubjects, listPapers } from '../api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [papersCount, setPapersCount] = useState(0);
  const [recentPapers, setRecentPapers] = useState([]);

  useEffect(() => {
    listSubjects().then((res) => setSubjectsCount(res.data.length)).catch(() => {});
    listPapers().then((res) => {
      setPapersCount(res.data.length);
      setRecentPapers(res.data.slice(0, 5));
    }).catch(() => {});
  }, []);

  return (
    <div className="home-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-card glass-card">
          <h1 className="welcome-title">
            Welcome to <span>QGen</span>
          </h1>
          <p className="welcome-subtitle">
            Upload your syllabus, textbook, and previous year papers to instantly generate professional question papers with AI.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-grid home-stats">
        <div className="stat-card gradient-card-1">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <h3>Subjects</h3>
            <div className="stat-number">{subjectsCount}</div>
          </div>
        </div>
        <div className="stat-card gradient-card-2">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>Papers</h3>
            <div className="stat-number">{papersCount}</div>
          </div>
        </div>
        <div className="stat-card gradient-card-3">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <h3>Quick Actions</h3>
            <div className="stat-number" style={{ fontSize: '1.2rem' }}>
              <Link to="/generate">Generate</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="quick-actions glass-card">
        <h2>Start Now</h2>
        <div className="action-grid">
          <Link to="/upload" className="action-item">
            <span className="action-icon">📤</span>
            <span>Upload Materials</span>
          </Link>
          <Link to="/generate" className="action-item">
            <span className="action-icon">📝</span>
            <span>Generate Paper</span>
          </Link>
        </div>
      </section>

      {/* Recent History */}
      <section className="history-panel">
        <h3>📜 Recent Papers</h3>
        {recentPapers.length === 0 ? (
          <div className="empty-history">No papers generated yet. Start by uploading a subject.</div>
        ) : (
          recentPapers.map((item) => (
            <div key={item._id} className="history-item">
              <div className="history-info">
                <div>{item.subject} – {item.difficulty}</div>
                <small>{new Date(item.generatedAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}