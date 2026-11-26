import React, { useState } from 'react';
import {
  ArrowUp,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Youtube,
  Mail
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { Page } from '../types';
import {
  officeNumber,
  officeNumberDisplay,
  officeSecondaryNumber,
  officeSecondaryNumberDisplay,
  officeLandlineNumber,
  officeLandlineNumberDisplay,
  contactPersonName,
  officialEmail,
  salesEmail,
  whatsappLink
} from '../utils/navigation';

type FooterProps = {
  navigate: (page: Page) => void;
};

export function Footer({ navigate }: FooterProps) {
  const [copiedGst, setCopiedGst] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyGst = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('33ACIFS9488E1ZN');
      setCopiedGst(true);
      setTimeout(() => setCopiedGst(false), 2000);
    }
  };

  return (
    <footer className="footer">
      {/* Animated Top Shimmer Line */}
      <div className="footer-shimmer-bar" />

      {/* Ambient background solar glow */}
      <div className="footer-ambient-glow" />

      <div className="container footer-main">
        {/* Brand & Purpose */}
        <div className="footer-brand">
          <button
            className="brand footer-logo"
            onClick={() => {
              navigate('home');
              scrollToTop();
            }}
            aria-label="Sumathi Agencies home"
          >
            <img src="/image.png" alt="Sumathi Agencies" />
          </button>
          <p>
            Practical solar and smart living solutions for a brighter tomorrow across Coimbatore &amp; Tamil Nadu.
          </p>

          <div className="footer-badge-pill">
            <span className="footer-pulse-dot" />
            <span>Serving Tamil Nadu since 2010</span>
          </div>

          <div className="socials">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp (+91 96002 99942)"
              className="social-btn whatsapp-social"
              title="Chat on WhatsApp (+91 96002 99942)"
            >
              <WhatsAppIcon size={17} />
              <span className="social-tooltip">WhatsApp</span>
            </a>
            <a
              href={`tel:${officeNumber}`}
              aria-label="Call Office"
              className="social-btn phone-social"
              title="Call Office"
            >
              <Phone size={16} />
              <span className="social-tooltip">Call Office</span>
            </a>
            <a
              href="https://youtube.com/@bestqualitysolarproductcoi4043?si=3udv7dIWLGBZoM0z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Sumathi Agencies on YouTube"
              className="social-btn youtube-social"
              title="Subscribe on YouTube"
            >
              <Youtube size={17} />
              <span className="social-tooltip">YouTube</span>
            </a>
            <a
              href="https://www.facebook.com/share/14vvM8y7AES/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Sumathi Agencies on Facebook"
              className="social-btn facebook-social"
              title="Follow on Facebook"
            >
              <Facebook size={17} fill="currentColor" strokeWidth={0} />
              <span className="social-tooltip">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/sumathi.agencies.2010?utm_source=qr&hvrq=MWpwZWgzY3dxZ3Fteg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Sumathi Agencies on Instagram"
              className="social-btn instagram-social"
              title="Follow on Instagram"
            >
              <Instagram size={17} />
              <span className="social-tooltip">Instagram</span>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-col">
          <h4>Explore</h4>
          <button
            className="footer-nav-link"
            onClick={() => {
              navigate('about');
              scrollToTop();
            }}
          >
            <span className="link-arrow">→</span>
            <span>About us</span>
          </button>
          <button
            className="footer-nav-link"
            onClick={() => {
              navigate('products');
              scrollToTop();
            }}
          >
            <span className="link-arrow">→</span>
            <span>Our solutions</span>
          </button>
          <button
            className="footer-nav-link"
            onClick={() => {
              navigate('gallery');
              scrollToTop();
            }}
          >
            <span className="link-arrow">→</span>
            <span>Project gallery</span>
          </button>
          <button
            className="footer-nav-link"
            onClick={() => {
              navigate('clients');
              scrollToTop();
            }}
          >
            <span className="link-arrow">→</span>
            <span>Happy customers</span>
          </button>
          <button
            className="footer-nav-link"
            onClick={() => {
              navigate('contact');
              scrollToTop();
            }}
          >
            <span className="link-arrow">→</span>
            <span>Contact us</span>
          </button>
        </div>

        {/* Column 3: Dedicated Office Address */}
        <div className="footer-col footer-address-col">
          <h4>Office &amp; Works</h4>
          <div className="footer-address-card">
            <div className="address-header">
              <span className="address-icon-wrap">
                <MapPin size={16} />
              </span>
              <strong className="address-name">Sumathi Agencies</strong>
            </div>
            <address className="address-body">
              No 5/316 A, Kuppanaickenpalayam,<br />
              Somayampalayam, Kanuvai,<br />
              Coimbatore - 641108,<br />
              Tamil Nadu, India
            </address>

            <a
              href="https://maps.google.com/?q=Sumathi+Agencies+Kanuvai+Coimbatore"
              target="_blank"
              rel="noreferrer"
              className="footer-map-link"
              title="Open directions in Google Maps"
            >
              <span>View on Google Maps</span>
              <ExternalLink size={12} />
            </a>

            <div className="footer-timing">
              <Clock size={13} />
              <span>24 Hours Support</span>
            </div>
          </div>
        </div>

        {/* Column 4: Direct Contacts */}
        <div className="footer-col footer-contact">
          <h4>Get in touch</h4>
          <div className="footer-contact-grid">
            {/* Chezian Numbers */}
            <div className="footer-contact-row">
              <Phone size={13} className="contact-link-icon" />
              <span className="footer-label">{contactPersonName} &mdash;</span>
              <a
                href={`tel:${officeNumber}`}
                className="footer-contact-link primary"
                title={`Call ${contactPersonName} (${officeNumberDisplay})`}
              >
                <span>{officeNumberDisplay}</span>
              </a>
              <a
                href={`tel:${officeSecondaryNumber}`}
                className="footer-contact-link secondary"
                title={`Call (${officeSecondaryNumberDisplay})`}
              >
                <span>{officeSecondaryNumberDisplay}</span>
              </a>
            </div>

            {/* Office Number */}
            <div className="footer-contact-row office-row">
              <Phone size={13} className="contact-link-icon" />
              <span className="footer-label">Office &mdash;</span>
              <a
                href={`tel:${officeLandlineNumber}`}
                className="footer-contact-link primary"
                title={`Call Office (${officeLandlineNumberDisplay})`}
              >
                <span>{officeLandlineNumberDisplay}</span>
              </a>
            </div>

            {/* Email Contact Row */}
            <div className="footer-contact-row email-row">
              <Mail size={13} className="contact-link-icon" />
              <span className="footer-label">Email &mdash;</span>
              <a
                href={`mailto:${officialEmail}`}
                className="footer-contact-link primary"
                title={`Email (${officialEmail})`}
              >
                <span>{officialEmail}</span>
              </a>
              <a
                href={`mailto:${salesEmail}`}
                className="footer-contact-link secondary"
                title={`Email (${salesEmail})`}
              >
                <span>{salesEmail}</span>
              </a>
            </div>
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="footer-contact-link wa-link"
            title="Chat directly on WhatsApp (+91 96002 99942)"
          >
            <WhatsAppIcon size={14} className="contact-link-icon" />
            <span>WhatsApp us (+91 96002 99942)</span>
          </a>
          <div className="footer-support-note">
            <Sparkles size={13} />
            <span>Direct consultation with solar specialists</span>
          </div>

          {/* Smooth Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            title="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="arrow-top-icon" />
          </button>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="container footer-bottom">
        <div className="footer-bottom-left">
          <span>© {new Date().getFullYear()} Sumathi Agencies. All rights reserved.</span>
          <span className="footer-tagline">• Powering clean energy for Tamil Nadu</span>
        </div>

        <div className="footer-bottom-right">
          <button
            type="button"
            onClick={copyGst}
            className="footer-gst-pill"
            title="Click to copy GSTIN"
          >
            <ShieldCheck size={13} />
            <span>GST: 33ACIFS9488E1ZN</span>
            {copiedGst ? (
              <span className="gst-toast">
                <Check size={11} /> Copied!
              </span>
            ) : (
              <Copy size={11} className="copy-icon" />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
