import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, Phone, Clock3, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { Page } from '../types';
import { officeNumber, officeNumberDisplay, whatsappLink } from '../utils/navigation';

type HeaderProps = {
  currentPage: Page;
  navigate: (page: Page) => void;
};

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'clients', label: 'Customers' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ currentPage, navigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (item: Page) => {
    navigate(item);
    setMenuOpen(false);
  };

  return (
    <div className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="topline">
        <div className="container topline-inner">
          <span>
            <Clock3 size={14} /> Serving Coimbatore since 2010
          </span>
          <div className="topline-links">
            <a href={`tel:${officeNumber}`}>
              <Phone size={14} /> {officeNumberDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" title="Chat on WhatsApp (+91 96002 99942)">
              <WhatsAppIcon size={14} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container nav-wrap">
          <button className="brand" onClick={() => handleNav('home')} aria-label="Sumathi Agencies home">
            <img src="/image.png" alt="Sumathi Agencies" />
          </button>
          <nav className={menuOpen ? 'nav mobile-open' : 'nav'}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={currentPage === item.id ? 'nav-link active' : 'nav-link'}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
                {item.id === 'products' && <ChevronRight size={14} />}
              </button>
            ))}
            <a
              className="nav-cta"
              href={whatsappLink('Hello Sumathi Agencies, I would like to enquire about your products.')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={16} /> Get a quote
            </a>
          </nav>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </div>
  );
}
