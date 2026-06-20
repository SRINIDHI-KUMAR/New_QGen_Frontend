import { useEffect, useRef } from 'react';

export default function PaperModal({ paper, visible, onClose }) {
  const modalRef = useRef();

  // Parse the paper string into separate questions for list display
  const parsePaper = (text) => {
    if (!text) return { partA: [], partB: [] };
    const lines = text.split('\n');
    const partA = [];
    const partB = [];
    let currentPart = null;
    for (const line of lines) {
      if (line.trim().startsWith('PART A')) {
        currentPart = 'A';
        continue;
      }
      if (line.trim().startsWith('PART B')) {
        currentPart = 'B';
        continue;
      }
      if (currentPart === 'A' && line.trim().match(/^\d+\./)) {
        partA.push(line.trim());
      } else if (currentPart === 'B' && line.trim().match(/^\d+\./)) {
        partB.push(line.trim());
      }
    }
    return { partA, partB };
  };

  const { partA, partB } = parsePaper(paper);

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (visible) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="modal-overlay"
      style={{ display: 'flex' }}
      onClick={handleOverlayClick}
      ref={modalRef}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2>📝 Generated Question Paper</h2>
          <button className="close-modal" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {partA.length > 0 && (
            <>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Part A (2 marks)</h3>
              <ul className="question-list">
                {partA.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}
          {partB.length > 0 && (
            <>
              <h3 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Part B (13 marks)</h3>
              <ul className="question-list">
                {partB.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}