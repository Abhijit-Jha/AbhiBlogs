import React from 'react';
import ContactLinks from './ContactLinks';
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full pt-10 pb-4 text-center">
      <div className="tracking-wider">
        Made with{' '}
        <motion.span
          whileHover={{ scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-block cursor-cell"
          aria-label="love"
        >
          ❤️
        </motion.span>{' '}
        by Abhijit Jha
      </div>
      <div className="mb-4">
        <ContactLinks />
      </div>
    </motion.footer>
  );
};

export default Footer;