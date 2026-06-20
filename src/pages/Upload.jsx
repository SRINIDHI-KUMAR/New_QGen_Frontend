import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadSubject } from '../api';

export default function Upload() {
  const [subjectName, setSubjectName] = useState('');
  const [syllabus, setSyllabus] = useState(null);
  const [textbook, setTextbook] = useState(null);
  const [pyqs, setPyqs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!subjectName || !syllabus || !textbook || !pyqs) {
      setMessage({ text: '❌ All fields and PDFs are required.', type: 'error' });
      return;
    }
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const formData = new FormData();
      formData.append('subjectName', subjectName);
      formData.append('syllabus', syllabus);
      formData.append('textbook', textbook);
      formData.append('pyqs', pyqs);

      await uploadSubject(formData);
      setMessage({ text: '✅ Upload successful! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/generate'), 2000);
    } catch (err) {
      setMessage({
        text: `❌ ${err.response?.data?.error || err.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderUploadBox = (labelText, file, setFile, inputId) => (
    <label
      htmlFor={inputId}
      className={`upload-area ${file ? 'has-file' : ''}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files[0];
        if (dropped?.type === 'application/pdf') setFile(dropped);
      }}
    >
      {file ? (
        <div className="file-info">
          <span className="file-icon">📄</span>
          <div className="file-details">
            <div className="file-name">{file.name}</div>
            <div className="file-meta">{(file.size / 1024).toFixed(0)} KB</div>
          </div>
          <span className="success-tick">✓</span>
        </div>
      ) : (
        <>
          <div className="upload-illustration">📂</div>
          <div className="upload-title">{labelText}</div>
          <div className="upload-subtitle">
            Drop PDF or <span className="browse-link">browse</span>
          </div>
        </>
      )}
      <input
        id={inputId}
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </label>
  );

  return (
    <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h2 className="animated-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
        📤 Upload Subject
      </h2>

      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="field">
          <label>Subject Name</label>
          <input
            type="text"
            className="curved-input"
            placeholder="e.g., DBMS"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {renderUploadBox('Syllabus PDF', syllabus, setSyllabus, 'syllabus-upload')}
          {renderUploadBox('Textbook PDF', textbook, setTextbook, 'textbook-upload')}
          {renderUploadBox('Previous Year Questions', pyqs, setPyqs, 'pyqs-upload')}
        </div>

        <button type="submit" className="generate-btn" disabled={loading} style={{ width: '100%' }}>
          {loading ? '⏳ Processing...' : 'Upload & Process'}
        </button>

        {message.text && (
          <p className={message.type === 'error' ? 'error-message' : 'success-message'} style={{ textAlign: 'center' }}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}