import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CircleCheck,
  Layers,
  Settings,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import type { Page, Product } from '../types';
import { products } from '../data/products';
import { goTo, whatsappLink } from '../utils/navigation';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Cta } from '../components/Cta';
import { defaultMotionEase } from '../components/MotionText';

type ProductDetailProps = {
  product: Product;
  navigate: (page: Page) => void;
};

export function ProductDetail({ product, navigate }: ProductDetailProps) {
  const [visualTilt, setVisualTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [iconHovered, setIconHovered] = useState(false);

  const Icon = product.icon;
  const words = product.title.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  // Quick navigation through solutions
  const currentIndex = products.findIndex((p) => p.slug === product.slug);
  const prevProduct =
    currentIndex > 0 ? products[currentIndex - 1] : products[products.length - 1];
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : products[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setVisualTilt({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setVisualTilt({ x: 0, y: 0 });
  };

  return (
    <>
      <PageHero
        eyebrow={product.tag}
        title={
          <>
            {firstWord}
            <br />
            <em>{restWords}</em>
          </>
        }
        copy={product.description}
      />

      <section className="section-pad detail-main">
        <div className="container detail-grid">
          <motion.div
            className={`detail-visual ${product.image ? 'has-bg-image' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${visualTilt.y}deg) rotateY(${visualTilt.x}deg)`,
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: defaultMotionEase }}
          >
            {product.image && (
              <div className="detail-image-layer">
                <img src={product.image} alt={product.title} className="detail-bg-image" />
                <div className="detail-image-gradient" />
              </div>
            )}

            <div className="detail-orbit">
              <span className="detail-orbit-node" />
            </div>
            <div className="detail-orbit-two">
              <span className="detail-orbit-node node-mint" />
            </div>

            <div
              className={`detail-icon-wrap ${iconHovered ? 'is-hovered' : ''}`}
              style={{
                transform: `translate3d(${visualTilt.x * 1.5}px, ${visualTilt.y * -1.5}px, 30px)`,
              }}
            >
              <div
                className="detail-icon"
                title={product.title}
                onMouseEnter={() => setIconHovered(true)}
                onMouseLeave={() => setIconHovered(false)}
              >
                <div className="detail-icon-glow" />
                <Icon size={52} />
              </div>
            </div>

            <span
              style={{
                transform: `translate3d(${visualTilt.x * 0.8}px, ${visualTilt.y * -0.8}px, 15px)`,
              }}
            >
              {product.number}
            </span>
            <small
              style={{
                transform: `translate3d(${visualTilt.x * -0.8}px, ${visualTilt.y * 0.8}px, 15px)`,
              }}
            >
              SUMATHI
              <br />
              AGENCIES
            </small>

            {product.image && (
              <div className="detail-showcase-badge">
                <span>Featured Installation</span>
              </div>
            )}
          </motion.div>

          <motion.div
            className="detail-copy"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: defaultMotionEase }}
          >
            <SectionHeading
              eyebrow="The right fit for you"
              title="Make more of every day."
              copy={product.detail}
            />

            <div className="detail-benefits">
              {product.benefits.map((benefit, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={benefit}
                    className={`detail-benefit-item ${hoveredBenefit === index ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredBenefit(index)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: defaultMotionEase }}
                  >
                    <div className="benefit-accent-bar" />
                    <CircleCheck size={19} />
                    <span>{benefit}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="detail-actions"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.2, ease: defaultMotionEase }}
            >
              <a
                className="button primary"
                href={whatsappLink(`Hello Sumathi Agencies, I am interested in ${product.title}.`)}
                target="_blank"
                rel="noreferrer"
                title="Enquire on WhatsApp (+91 96002 99942)"
              >
                <WhatsAppIcon size={18} /> Enquire on WhatsApp
              </a>
              <button className="button outline" onClick={() => navigate('contact')}>
                Contact our team <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* In-Depth Technical Content & Old Website Archive Copy */}
        <div className="container detail-deep-dive">
          {product.fullOverview && product.fullOverview.length > 0 && (
            <div className="detail-overview-box">
              <motion.h3
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: defaultMotionEase }}
              >
                <Sparkles size={22} /> Comprehensive Solution Overview
              </motion.h3>
              {product.fullOverview.map((paragraph, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, delay: idx * 0.08, ease: defaultMotionEase }}
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </div>
          )}

          <div className="detail-specs-features-grid">
            {product.features && product.features.length > 0 && (
              <motion.div
                className="detail-features-card"
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: defaultMotionEase }}
              >
                <h3>
                  <CheckCircle2 size={22} /> Key Features & Capabilities
                </h3>
                <ul className="detail-features-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>
                      <CircleCheck size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <motion.div
                className="detail-specs-card"
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: defaultMotionEase }}
              >
                <h3>
                  <Settings size={22} /> Technical Specifications
                </h3>
                <table className="detail-specs-table">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx}>
                        <th>{spec.label}</th>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>

          {product.applications && product.applications.length > 0 && (
            <motion.div
              className="detail-applications-card"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: defaultMotionEase }}
            >
              <h3>
                <Layers size={22} /> Ideal Applications & Settings
              </h3>
              <div className="detail-applications-grid">
                {product.applications.map((app, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      className="detail-app-item"
                      initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5, delay: (idx % 4) * 0.06, ease: defaultMotionEase }}
                    >
                      <CircleCheck size={17} />
                      <span>{app}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <div className="solution-nav-bar">
            <button
              className="solution-nav-btn prev"
              onClick={() => goTo(prevProduct.slug)}
              title={`Previous: ${prevProduct.title}`}
            >
              <ArrowLeft size={16} /> Previous: {prevProduct.title}
            </button>
            <button
              className="solution-nav-btn next"
              onClick={() => goTo(nextProduct.slug)}
              title={`Next: ${nextProduct.title}`}
            >
              Next: {nextProduct.title} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="detail-strip">
        <div className="container detail-strip-inner">
          <motion.div
            className="detail-strip-item"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: defaultMotionEase }}
          >
            <BadgeCheck size={22} />
            <span>
              <strong>Practical advice</strong> Recommendations made for your needs
            </span>
          </motion.div>
          <motion.div
            className="detail-strip-item"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08, ease: defaultMotionEase }}
          >
            <Wrench size={22} />
            <span>
              <strong>Complete support</strong> From planning to after-sales care
            </span>
          </motion.div>
          <motion.button
            className="back-link"
            onClick={() => navigate('products')}
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.16, ease: defaultMotionEase }}
          >
            <ArrowRight size={16} /> See all solutions
          </motion.button>
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  );
}
