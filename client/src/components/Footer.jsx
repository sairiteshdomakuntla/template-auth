import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2025 Ritesh. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:contact@example.com" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}