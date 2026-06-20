import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          📄 PaperGen
        </Link>
        <div className="space-x-4">
          <Link to="/upload" className="text-gray-600 hover:text-blue-600 transition">Upload</Link>
          <Link to="/generate" className="text-gray-600 hover:text-blue-600 transition">Generate</Link>
        </div>
      </div>
    </nav>
  );
}