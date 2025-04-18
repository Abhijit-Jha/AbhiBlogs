'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { name: 'Portfolio', href: 'https://www.abhijit.website/' },
    { name: 'Github', href: 'https://github.com/Abhijit-Jha/' },
    { name: 'Linkedin', href: 'https://www.linkedin.com/in/abhijit-jha1/' },
];

const Header = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <header className="fixed top-4 left-0 right-0 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-3 bg-transparent backdrop-blur-lg text-white border border-primary/10 shadow-lg rounded-2xl z-50 flex items-center">
            <div className="flex justify-between items-center w-full">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient"
                >
                    AbhiBlogs
                </motion.h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative text-lg font-semibold text-glow hover:underline transition duration-300"
                        >
                            {link.name}
                            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-400 rounded-full animate-pulse" />
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileNavOpen(!mobileNavOpen)}
                        className="text-white focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileNavOpen && (
                <div className="absolute top-16 left-0 right-0 bg-black/100 rounded-lg py-4 px-6 z-40 md:hidden">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileNavOpen(false)}
                                className="text-lg font-semibold text-glow"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
