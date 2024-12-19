import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Crop Recommendation
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-green-200">Home</Link>
            <Link to="/recommend" className="hover:text-green-200">Get Recommendation</Link>
            <Link to="/about" className="hover:text-green-200">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;