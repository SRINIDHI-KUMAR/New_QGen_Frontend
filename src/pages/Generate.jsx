import { useState, useEffect } from 'react';
import { generatePaper, listSubjects, listPapers } from '../api';
import PaperModal from '../components/PaperModal';
import { FiEdit, FiClock, FiAlertCircle, FiLoader } from 'react-icons/fi';

export default function Generate() {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState('');
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    listSubjects()
      .then((res) => setSubjects(res.data))
      .catch(() => {});
    listPapers()
      .then((res) => setHistory(res.data))
      .catch(() => {});
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!subject) {
      setError('Subject required');
      return;
    }
    setLoading(true);
    setError('');
    setPaper('');
    try {
      const res = await generatePaper({ subject, difficulty });
      setPaper(res.data.paper);
      setShowModal(true);
      listPapers().then((res) => setHistory(res.data)).catch(() => {});
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewPaper = (content) => {
    setPaper(content);
    setShowModal(true);
  };

  return (
    <>
      <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="animated-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <FiEdit /> Generate Paper
        </h2>

        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="field">
            <label>Subject</label>
            <select
              className="curved-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">-- Select a subject --</option>
              {subjects.map((s) => (
                <option key={s._id} value={s.subjectName}>
                  {s.subjectName}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Difficulty</label>
            <select
              className="curved-input"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button type="submit" className="generate-btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <FiLoader className="spin" /> Generating...
              </span>
            ) : (
              'Generate Paper'
            )}
          </button>
          {error && (
            <p className="error-message" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <FiAlertCircle /> {error}
            </p>
          )}
        </form>
      </div>

      <div className="history-panel" style={{ maxWidth: '700px', margin: '1.5rem auto' }}>
        <h3>
          <FiClock style={{ marginRight: '0.4rem', verticalAlign: 'middle', color: 'var(--accent-blue)' }} />
          Recent Papers
        </h3>
        {history.length === 0 ? (
          <div className="empty-history">No papers generated yet.</div>
        ) : (
          history.slice(0, 5).map((item) => (
            <div key={item._id} className="history-item" onClick={() => viewPaper(item.paper)}>
              <div className="history-info">
                <div>{item.subject} – {item.difficulty}</div>
                <small>{new Date(item.generatedAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        )}
      </div>

      <PaperModal
        paper={paper}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}