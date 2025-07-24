
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    if (!mounted) return;
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transform transition-all duration-300">
            <img 
              src="https://static.readdy.ai/image/f7efb641c38d6268640c0be8ec3ad911/17786b39113b5312a2455fbae5022519.png" 
              alt="InHub Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              Services
            </Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              Case Studies
            </Link>
            <Link href="/warehouse" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              Warehouse
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              Projects
            </Link>
            <Link href="/skills" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              InHub Skills
            </Link>
            <Link href="/design" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              InHub Design
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1F3D3A] transition-colors duration-300 hover:scale-105 transform">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="/diagnosis" 
            className="hidden md:block bg-[#1F3D3A] text-white px-6 py-2 rounded-full hover:bg-[#2a5248] hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer transform"
          >
            Let's Start
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-[#1F3D3A] hover:scale-110 transition-all duration-300 transform"
            onClick={toggleMenu}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mounted && isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/services" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">Services</Link>
              <Link href="/case-studies" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">Case Studies</Link>
              <Link href="/warehouse" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">Warehouse</Link>
              <Link href="/projects" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">Projects</Link>
              <Link href="/skills" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">InHub Skills</Link>
              <Link href="/design" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">InHub Design</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#1F3D3A] transition-colors">Contact</Link>
              <Link href="/diagnosis" className="bg-[#1F3D3A] text-white px-6 py-2 rounded-full hover:bg-[#2a5248] transition-colors inline-block text-center whitespace-nowrap cursor-pointer">
                Let's Start
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
