import React, { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  CircleCheck,
  Phone,
  Sparkles,
  MapPin,
  Clock,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  User,
  MessageSquare,
  Mail
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
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
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { defaultMotionEase } from '../components/MotionText';

const POPULAR_INTERESTS = [
  'Solar Power Plants',
  'Solar Pump Systems',
  'Solar Water Heater (ETC Model)',
  'Solar Water Heater (FPC Model)',
  'Solar Street Light (Wall Mounted)',
  'Solar Street Light (Pole Mounted)',
  'Home UPS & Inverter',
  'Solar Fencing & Dryer',
  'CCTV & IoT Automation',
  'Water Softeners & RO',
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('Solar Power Plants');
  const [copiedGst, setCopiedGst] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formHovered, setFormHovered] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') || nameValue;
    const interest = data.get('interest') || selectedInterest;
    const message = data.get('message') || messageValue;
    const text = `Hello Sumathi Agencies, my name is ${name}. I am interested in ${interest}. ${message || ''}`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const copyGst = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('33ACIFS9488E1ZN');
      setCopiedGst(true);
      setTimeout(() => setCopiedGst(false), 2200);
    }
  };

  const copyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(
        `${contactPersonName}: ${officeNumberDisplay} / ${officeSecondaryNumberDisplay}, Office: ${officeLandlineNumberDisplay}`
      );
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`${officialEmail}, ${salesEmail}`);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Let’s connect"
        title={
          <>
            Your next step<br />
            <em>starts here.</em>
          </>
        }
        copy="Tell us what you have in mind. Our team will get back to you with practical advice and a clear way forward."
      />

      <section className="section-pad contact-main">
        <div className="container contact-grid">
          {/* Left Column: Interactive Contact Channels */}
          <motion.div
            className="contact-details"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: defaultMotionEase }}
          >
            <SectionHeading
              eyebrow="Contact us"
              title="We’re happy to help."
              copy="Reach out directly or send us a few details. No pressure, no complicated jargon."
            />

            <div className="contact-list">
              {/* Phone Channel Card */}
              <motion.div
                className="contact-card-interactive group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.05, ease: defaultMotionEase }}
              >
                <div className="contact-card-main">
                  <a
                    href={`tel:${officeNumber}`}
                    className="contact-icon phone-icon"
                    title={`Call ${contactPersonName} (${officeNumberDisplay})`}
                    aria-label={`Call ${contactPersonName}`}
                  >
                    <Phone size={19} />
                  </a>
                  <div className="contact-card-content">
                    <div className="contact-card-top">
                      <small>Office &amp; Support</small>
                      <span className="contact-badge-pill">24 Hours</span>
                    </div>
                    <div className="contact-phone-grid">
                      <span className="contact-person-label">{contactPersonName} &mdash;</span>
                      <a
                        href={`tel:${officeNumber}`}
                        className="contact-phone-num primary"
                        title={`Call ${contactPersonName} (${officeNumberDisplay})`}
                      >
                        {officeNumberDisplay}
                      </a>
                      <a
                        href={`tel:${officeSecondaryNumber}`}
                        className="contact-phone-num secondary"
                        title={`Call ${officeSecondaryNumberDisplay}`}
                      >
                        {officeSecondaryNumberDisplay}
                      </a>

                      <span className="contact-person-label office-label">Office &mdash;</span>
                      <a
                        href={`tel:${officeLandlineNumber}`}
                        className="contact-phone-num primary office-num"
                        title={`Call Office (${officeLandlineNumberDisplay})`}
                      >
                        {officeLandlineNumberDisplay}
                      </a>
                    </div>
                    <span className="contact-card-sub">Direct line to our technical desk</span>
                  </div>
                </div>
                <div className="contact-card-actions">
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="contact-action-btn"
                    title="Copy phone numbers"
                  >
                    {copiedPhone ? <Check size={14} className="copied" /> : <Copy size={14} />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={`tel:${officeNumber}`}
                    className="contact-action-btn primary"
                    title={`Call ${contactPersonName} (${officeNumberDisplay})`}
                  >
                    <Phone size={13} />
                    <span>Call</span>
                  </a>
                </div>
              </motion.div>

              {/* WhatsApp Channel Card */}
              <motion.div
                className="contact-card-interactive whatsapp-card group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.12, ease: defaultMotionEase }}
              >
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card-main"
                >
                  <span className="contact-icon whatsapp">
                    <WhatsAppIcon size={22} color="#ffffff" />
                    <span className="whatsapp-pulse-ring" />
                  </span>
                  <div className="contact-card-content">
                    <div className="contact-card-top">
                      <small>WhatsApp</small>
                      <span className="contact-badge-pill active">
                        <span className="status-live-dot" /> Instant response
                      </span>
                    </div>
                    <strong>+91 96002 99942</strong>
                    <span>+91 96007 99942</span>
                  </div>
                </a>
                <div className="contact-card-actions">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-action-btn whatsapp-btn"
                    title="Open WhatsApp chat (+91 96002 99942)"
                  >
                    <WhatsAppIcon size={15} />
                    <span>Chat now</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </motion.div>

              {/* Email Channel Card */}
              <motion.div
                className="contact-card-interactive email-card group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.15, ease: defaultMotionEase }}
              >
                <div className="contact-card-main">
                  <a
                    href={`mailto:${officialEmail}`}
                    className="contact-icon email-icon"
                    title={`Email us (${officialEmail})`}
                    aria-label="Send email"
                  >
                    <Mail size={19} />
                  </a>
                  <div className="contact-card-content">
                    <div className="contact-card-top">
                      <small>Email &amp; Inquiries</small>
                      <span className="contact-badge-pill">Official Desk</span>
                    </div>
                    <div className="contact-email-grid">
                      <a
                        href={`mailto:${officialEmail}`}
                        className="contact-email-link primary"
                        title={`Send email to ${officialEmail}`}
                      >
                        {officialEmail}
                      </a>
                      <a
                        href={`mailto:${salesEmail}`}
                        className="contact-email-link secondary"
                        title={`Send email to ${salesEmail}`}
                      >
                        {salesEmail}
                      </a>
                    </div>
                    <span className="contact-card-sub">Quick reply for sales, quotes &amp; corporate inquiries</span>
                  </div>
                </div>
                <div className="contact-card-actions">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="contact-action-btn"
                    title="Copy email addresses"
                  >
                    {copiedEmail ? <Check size={14} className="copied" /> : <Copy size={14} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={`mailto:${officialEmail}`}
                    className="contact-action-btn primary"
                    title={`Send email to ${officialEmail}`}
                  >
                    <Mail size={13} />
                    <span>Email</span>
                  </a>
                </div>
              </motion.div>

              {/* Office Visit Card */}
              <motion.div
                className="contact-card-interactive address-card"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.18, ease: defaultMotionEase }}
              >
                <div className="contact-card-main">
                  <span className="contact-icon map-icon">
                    <Building2 size={19} />
                  </span>
                  <div className="contact-card-content">
                    <div className="contact-card-top">
                      <small>Visit us</small>
                      <span className="contact-badge-pill">Coimbatore HQ</span>
                    </div>
                    <strong>No 5/316 A, Kuppanaickenpalayam</strong>
                    <span>
                      Somayampalayam, Kanuvai<br />
                      Coimbatore - 641108
                    </span>
                  </div>
                </div>
                <div className="contact-card-actions">
                  <a
                    href="https://maps.google.com/?q=Sumathi+Agencies+Kanuvai+Coimbatore"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-action-btn"
                    title="View location in Google Maps"
                  >
                    <MapPin size={13} />
                    <span>View Map</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Interactive GST & Trust Verification Strip */}
            <motion.div
              className="contact-trust-bar"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.24, ease: defaultMotionEase }}
            >
              <div className="gst interactive-gst">
                <div className="gst-info">
                  <span className="gst-tag">
                    <ShieldCheck size={14} /> GST
                  </span>
                  <code className="gst-code">33ACIFS9488E1ZN</code>
                </div>
                <button
                  type="button"
                  onClick={copyGst}
                  className="gst-copy-btn"
                  title="Copy GSTIN for verification"
                >
                  {copiedGst ? (
                    <>
                      <Check size={13} className="copied" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy GST</span>
                    </>
                  )}
                </button>
              </div>

              {/* Confidence Micro-Badges */}
              <div className="contact-perks-row">
                <div className="perk-item">
                  <Clock size={14} />
                  <span>2–4 Hr Quick Response</span>
                </div>
                <div className="perk-item">
                  <Zap size={14} />
                  <span>Free Technical Consultation</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Quick Enquiry Form */}
          <motion.div
            className={`enquiry-form-container ${formHovered ? 'form-focused' : ''}`}
            onMouseEnter={() => setFormHovered(true)}
            onMouseLeave={() => setFormHovered(false)}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: defaultMotionEase }}
          >
            <div className="form-card-shimmer" />

            <form className="enquiry-form" onSubmit={submit}>
              <div className="form-title">
                <div>
                  <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: defaultMotionEase }}
                  >
                    Quick enquiry
                  </motion.span>
                  <small className="form-subtitle">Direct message to our engineering team</small>
                </div>
                <div className="form-sparkle-wrap">
                  <Sparkles size={20} className="sparkle-icon" />
                </div>
              </div>

              {/* Name Input with Active State */}
              <label>
                <div className="label-row">
                  <span>Your name</span>
                  {nameValue.trim().length > 1 && (
                    <span className="field-ready">
                      <CircleCheck size={12} /> Ready
                    </span>
                  )}
                </div>
                <div className="input-with-icon">
                  <User size={15} className="input-icon" />
                  <input
                    name="name"
                    placeholder="How should we call you?"
                    required
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                </div>
              </label>

              {/* Interactive Quick Service Chips */}
              <div className="interest-chips-section">
                <span className="chips-title">Popular solutions:</span>
                <div className="interest-chips">
                  {POPULAR_INTERESTS.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`interest-chip ${selectedInterest === item ? 'active' : ''}`}
                      onClick={() => setSelectedInterest(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Select Dropdown */}
              <label>
                <div className="label-row">
                  <span>What can we help with?</span>
                  <span className="selected-indicator">{selectedInterest}</span>
                </div>
                <select
                  name="interest"
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                >
                  <option>Solar Power Plants</option>
                  <option>Solar Pump Systems</option>
                  <option>Solar Water Heater</option>
                  <option>Solar Street Lights</option>
                  <option>Home UPS & Inverter</option>
                  <option>CCTV & IoT Automation</option>
                  <option>Water Softeners & RO Plants</option>
                  <option>Something else</option>
                </select>
              </label>

              {/* Message Textarea */}
              <label>
                <div className="label-row">
                  <span>Your message</span>
                  <span className="optional">optional</span>
                </div>
                <div className="input-with-icon textarea-wrap">
                  <MessageSquare size={15} className="input-icon textarea-icon" />
                  <textarea
                    name="message"
                    placeholder="Tell us a little about your requirement..."
                    rows={4}
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                  />
                </div>
              </label>

              {/* Interactive Submit Button */}
              <motion.button
                className="button primary form-submit interactive-submit"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon size={18} className="submit-wa-icon" />
                <span>Continue on WhatsApp (+91 96002 99942)</span>
                <ArrowUpRight size={16} className="submit-arrow" />
              </motion.button>

              {/* Live Feedback Toast */}
              {sent && (
                <div className="form-success animated-toast">
                  <CircleCheck size={18} className="toast-check" />
                  <div>
                    <strong>WhatsApp chat opened!</strong>
                    <span>Our team will review your enquiry immediately.</span>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
