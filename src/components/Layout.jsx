import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <div className="main-container">{children}</div>
    </div>
  );
}