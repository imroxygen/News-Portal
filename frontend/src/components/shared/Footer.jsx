import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm">
            We are committed to delivering exceptional services to help you
            achieve your fitness goals, with state-of-the-art facilities and
            personalized support.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to={"/"} className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/news"} className="hover:text-white">
                News Articles
              </Link>
            </li>
            <li>
              <Link to={"/"} className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400 text-sm">
            Kolkata,West Bengal,741222,India
          </p>
          <p className="text-gray-400 text-sm">Email: amj@gmail.com</p>
          <p className="text-gray-400 text-sm">Phone: +91 7001269603</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        <p>Follow us on</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="hover:text-white">
            FaceBook
          </a>
          <a href="#" className="hover:text-white">
            Instagram
          </a>
          <a href="#" className="hover:text-white">
            Twitter
          </a>
          <a href="#" className="hover:text-white">
            Linkedin
          </a>
        </div>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} Next News. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;