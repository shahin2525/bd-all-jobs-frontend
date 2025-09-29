"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            We connect job seekers and recruiters with a seamless hiring
            platform. Our goal is to simplify the job search and recruitment
            process for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about-us"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:support@yourjobportal.com"
              className="hover:text-white transition-colors"
            >
              support@yourjobportal.com
            </a>
          </p>
          <p className="text-sm">Phone: +880 1234 567890</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition-colors"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition-colors"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8">
        <p className="text-center text-sm py-4">
          &copy; {year} Your Job Portal. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
