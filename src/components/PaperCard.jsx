export default function PaperCard({ paper }) {
  if (!paper) return null;
  return (
    <div className="glass-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 600 }}>
        📝 Generated Question Paper
      </h3>
      <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {paper}
      </div>
    </div>
  );
}