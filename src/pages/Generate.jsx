import { useState, useEffect } from 'react';
import { generatePaper, listSubjects, listPapers } from '../api';
import PaperModal from '../components/PaperModal';

export default function Generate() {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState('');
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState([]);    // for dropdown
  const [history, setHistory] = useState([]);      // recent papers
  const [showModal, setShowModal] = useState(false);

  // Fetch subjects and history on mount
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
      setShowModal(true);   // open dialog
      // Optionally refresh history after generation
      listPapers().then((res) => setHistory(res.data)).catch(() => {});
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // View a history paper
  const viewPaper = (content) => {
    setPaper(content);
    setShowModal(true);
  };

  return (
    <>
      <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="animated-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          📝 Generate Paper
        </h2>

        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Subject dropdown */}
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
            {loading ? '⏳ Generating...' : 'Generate Paper'}
          </button>
          {error && <p className="error-message" style={{ textAlign: 'center' }}>❌ {error}</p>}
        </form>
      </div>

      {/* Recent Papers History */}
      <div className="history-panel" style={{ maxWidth: '700px', margin: '1.5rem auto' }}>
        <h3>📜 Recent Papers</h3>
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

      {/* Paper Modal */}
      <PaperModal
        paper={paper}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}