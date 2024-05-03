import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Your News Website</p>
            <p>
              <Link to="/about" className="text-white">
                About Us
              </Link>{' '}
              |{' '}
              <Link to="/contact" className="text-white">
                Contact Us
              </Link>
            </p>
          </div>
        </footer>
      );
}
