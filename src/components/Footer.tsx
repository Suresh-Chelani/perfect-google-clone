
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-google-footer border-t border-google-border">
      <div className="px-8 py-3">
        <div className="text-sm text-google-footer-text">
          India
        </div>
      </div>
      <div className="border-t border-google-border px-8 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex flex-wrap justify-center sm:justify-start space-x-6">
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              About
            </a>
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              Advertising
            </a>
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              Business
            </a>
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              How Search works
            </a>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-6">
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              Privacy
            </a>
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              Terms
            </a>
            <a href="#" className="text-sm text-google-footer-text hover:underline">
              Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
