import React, { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappLink } from '../utils/navigation';

export function FloatingSocials() {
  const [hovered, setHovered] = useState<'wa' | 'yt' | 'ig' | 'fb' | null>(null);

  return (
    <aside aria-label="Quick contact and social links" className="floating-socials-dock">
      {/* WhatsApp Chat Floating Action */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-wa-btn"
        aria-label="Chat with Sumathi Agencies on WhatsApp (+91 96002 99942)"
        title="Chat on WhatsApp (+91 96002 99942)"
        onMouseEnter={() => setHovered('wa')}
        onMouseLeave={() => setHovered(null)}
      >
        <span className="floating-social-pulse floating-wa-pulse" />
        <span className="floating-social-icon-wrap floating-wa-icon-wrap">
          <WhatsAppIcon size={22} color="#ffffff" />
        </span>
        <span className={`floating-social-label ${hovered === 'wa' ? 'visible' : ''}`}>
          Chat on WhatsApp
        </span>
      </a>

      {/* YouTube Channel */}
      <a
        href="https://youtube.com/@bestqualitysolarproductcoi4043?si=3udv7dIWLGBZoM0z"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-yt-btn"
        aria-label="Subscribe to Sumathi Agencies on YouTube"
        title="Watch on YouTube"
        onMouseEnter={() => setHovered('yt')}
        onMouseLeave={() => setHovered(null)}
      >
        <span className="floating-social-pulse floating-yt-pulse" />
        <span className="floating-social-icon-wrap floating-yt-icon-wrap">
          <Youtube size={20} />
        </span>
        <span className={`floating-social-label ${hovered === 'yt' ? 'visible' : ''}`}>
          Watch on YouTube
        </span>
      </a>

      {/* Instagram Profile */}
      <a
        href="https://www.instagram.com/sumathi.agencies.2010?utm_source=qr&hvrq=MWpwZWgzY3dxZ3Fteg=="
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-ig-btn"
        aria-label="Follow Sumathi Agencies on Instagram"
        title="Follow on Instagram"
        onMouseEnter={() => setHovered('ig')}
        onMouseLeave={() => setHovered(null)}
      >
        <span className="floating-social-pulse floating-ig-pulse" />
        <span className="floating-social-icon-wrap floating-ig-icon-wrap">
          <Instagram size={20} />
        </span>
        <span className={`floating-social-label ${hovered === 'ig' ? 'visible' : ''}`}>
          Follow on Instagram
        </span>
      </a>

      {/* Facebook Page */}
      <a
        href="https://www.facebook.com/share/14vvM8y7AES/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-btn floating-fb-btn"
        aria-label="Visit Sumathi Agencies on Facebook"
        title="Find on Facebook"
        onMouseEnter={() => setHovered('fb')}
        onMouseLeave={() => setHovered(null)}
      >
        <span className="floating-social-pulse floating-fb-pulse" />
        <span className="floating-social-icon-wrap floating-fb-icon-wrap">
          <Facebook size={20} fill="currentColor" strokeWidth={0} />
        </span>
        <span className={`floating-social-label ${hovered === 'fb' ? 'visible' : ''}`}>
          Find us on Facebook
        </span>
      </a>
    </aside>
  );
}
