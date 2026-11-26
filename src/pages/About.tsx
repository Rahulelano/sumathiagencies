import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Cpu,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Sun,
  Zap,
} from 'lucide-react';
import type { Page } from '../types';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Cta } from '../components/Cta';
import { AboutHeroSolarIllustration } from '../components/AboutHeroSolarIllustration';
import { AboutQualityIllustration } from '../components/AboutQualityIllustration';
import { AboutEngineerIllustration } from '../components/AboutEngineerIllustration';
import { defaultMotionEase } from '../components/MotionText';

type AboutProps = {
  navigate: (page: Page) => void;
};

const timelineData = [
  {
    year: '2010',
    title: 'Where it began',
    desc: 'Sumathi Agencies was founded in Coimbatore with a clear commitment to delivering dependable solar and energy systems.',
  },
  {
    year: '15+',
    title: 'Years of Excellence',
    desc: 'Hundreds of commercial, agricultural, and domestic installations executed with top engineering standards.',
  },
  {
    year: 'Today',
    title: 'Greener Tomorrow',
    desc: 'Specializing in turnkey solar plants, pumping systems, street lighting, EV infrastructure, and pure water systems.',
  },
];

const metricsData = [
  { value: '250+', label: 'Clients Served' },
  { value: '135+', label: 'Successful Projects' },
  { value: '450+', label: 'Solar Systems Installed' },
  { value: '325+', label: 'Custom Engineering Designs' },
];

const evaluationFactors = [
  {
    title: 'Client & Enterprise Budget Planning',
    desc: 'Solar panels can be an investment, so businesses and institutions need to factor in the total cost and ROI of the panels when making a decision. By considering all financial factors and available subsidies, clients can select the solar panels best suited for their exact requirements.',
    icon: BarChart3,
  },
  {
    title: 'Solar Insolation & Roof Space Sizing',
    desc: 'The amount of sunlight that the site receives directly determines electricity generation. Solar panels will generate more electricity in areas with higher sunlight exposure. The physical size and load capacity of the roof will determine how many solar panels can be installed safely.',
    icon: Sun,
  },
  {
    title: 'Standard Test Conditions (STC) Rating',
    desc: 'The Standard Test Conditions (STC) rating is another vital parameter used to evaluate solar panels. STC refers to a specific set of standardized conditions under which panels are tested, incorporating standard cell temperature (25°C), solar irradiance (1000 W/m²), and air mass (1.5).',
    icon: Gauge,
  },
  {
    title: 'Photovoltaic Conversion Efficiency',
    desc: 'This is a measure of how much sunlight a solar panel can convert into usable electrical energy. Panels with higher efficiency ratings produce substantially more power from the same physical surface area, maximizing returns on compact roofs.',
    icon: Zap,
  },
  {
    title: 'Peak Power Output Rating (Pmax)',
    desc: 'This is the exact amount of electrical wattage a solar panel can produce under ideal laboratory and field conditions. Panels with higher power output ratings generate more total electricity overall for demanding commercial and industrial loads.',
    icon: Cpu,
  },
  {
    title: 'Government Subsidies & Net Metering',
    desc: 'We assist clients at every step to access local government financial subsidies and tax benefits. We take care of the entire process from structural design to net-metering activation to provide you with a turnkey solar system that is effortless to operate.',
    icon: Award,
  },
];

export function About({ navigate }: AboutProps) {
  const [activeTimeline, setActiveTimeline] = useState<number>(1);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title={
          <>
            We’re Using Solar Power<br />
            <em>to Simplify.</em>
          </>
        }
        copy="Sumathi Agencies is your trusted solar panel system specialist for commercial and domestic installations across Coimbatore and Tamil Nadu."
        visual={<AboutHeroSolarIllustration />}
      />

      <section className="section-pad about-main">
        <div className="container about-grid">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="We’re Using Solar Power to Simplify."
              copy="Sumathi Agencies is your global solar panel system specialist for commercial and domestic purpose. We help you maximize the assets and value of your property by introducing the financial benefits of solar for your business. Achieve impressive energy savings, property appreciation, a potential revenue stream, and company integrity."
            />

            <motion.p
              className="body-copy"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
            >
              We always support our clients every step of the way and help them access the financial subsidies and tax benefits of solar from the local government. We take care of the entire process from design to activation to provide you with a turnkey solar system that you know how to operate.
            </motion.p>

            <motion.p
              className="body-copy"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.18, ease: defaultMotionEase }}
            >
              We are lucky enough to work with a wide variety of clients from various businesses and establishments who rate us for quality and efficiency. They are always amazed by the financial benefits of our systems.
            </motion.p>

            <motion.p
              className="body-copy"
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.24, ease: defaultMotionEase }}
            >
              We believe Solar is the most affordable energy source on the planet. Using solar energy we can make easier our life on this earth. We are able to provide advanced-quality installation and maintenance of solar energy systems, wind installations, and EV charging ports.
            </motion.p>

            <motion.button
              className="button primary"
              onClick={() => navigate('contact')}
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.28, ease: defaultMotionEase }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a conversation <ArrowRight size={18} />
            </motion.button>
          </div>

          <div className="about-timeline">
            {timelineData.map((item, index) => {
              const isActive = activeTimeline === index;
              return (
                <motion.div
                  key={item.year}
                  className={`timeline-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTimeline(index)}
                  onMouseEnter={() => setActiveTimeline(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveTimeline(index);
                    }
                  }}
                  title="Click or hover milestone"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: defaultMotionEase }}
                >
                  <strong>{item.year}</strong>
                  <span>{item.title}</span>
                  <p>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Values and Mission Card */}
        <div className="container about-deep-content">
          <div className="about-detailed-card">
            <div className="about-card-split">
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -45 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: defaultMotionEase }}
                >
                  <ShieldCheck size={24} /> Why Choose Us — Greener Tomorrow for Everyone
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 45 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: defaultMotionEase }}
                >
                  We’re able to offset expensive electricity prices because our solar panels produce energy much more efficiently than traditional utilities. You save money.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -45 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: 0.16, ease: defaultMotionEase }}
                >
                  By investing in clean photovoltaic energy, you secure predictable power costs for over 25 years while insulating your facility against utility tariff hikes. Our installations combine Tier-1 solar modules, German-engineered or high-grade smart inverters, and precision structural mountings designed to endure high wind loads and harsh weather conditions.
                </motion.p>

                <div className="about-ratios-grid">
                  <motion.div
                    className="about-ratio-card"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.05, ease: defaultMotionEase }}
                  >
                    <strong>80%</strong>
                    <span>Cost Savings on Energy Bills</span>
                  </motion.div>

                  <motion.div
                    className="about-ratio-card"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: defaultMotionEase }}
                  >
                    <strong>80%</strong>
                    <span>Higher Energy Efficiency</span>
                  </motion.div>

                  <motion.div
                    className="about-ratio-card"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.18, ease: defaultMotionEase }}
                  >
                    <strong>70%</strong>
                    <span>Renewable & Environmental Impact</span>
                  </motion.div>

                  <motion.div
                    className="about-ratio-card"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.24, ease: defaultMotionEase }}
                  >
                    <strong>85%</strong>
                    <span>Overall System Efficiency</span>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="about-card-visual"
                initial={{ opacity: 0, x: 55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: defaultMotionEase }}
              >
                <AboutQualityIllustration />
              </motion.div>
            </div>
          </div>

          {/* Engineer Planning & Technical Criteria */}
          <div className="about-detailed-card">
            <div className="about-engineer-head-split">
              <div>
                <SectionHeading
                  eyebrow="Expert Engineering"
                  title="Check Our Leading Engineer's Plans"
                  copy="How our engineering team evaluates every project to ensure maximum electricity yield and uninterrupted operational life."
                />
              </div>
              <motion.div
                className="about-engineer-visual"
                initial={{ opacity: 0, x: 55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: defaultMotionEase }}
              >
                <AboutEngineerIllustration />
              </motion.div>
            </div>

            <div className="about-eval-grid">
              {evaluationFactors.map((factor, index) => {
                const FactorIcon = factor.icon;
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    className="about-eval-card"
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: defaultMotionEase }}
                  >
                    <div className="about-eval-card-header">
                      <FactorIcon size={24} />
                      <strong>{factor.title}</strong>
                    </div>
                    <p>{factor.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="dark-band">
        <div className="container metrics">
          {metricsData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.label}
                className={`metric-tile ${hoveredMetric === index ? 'metric-hovered' : ''}`}
                onMouseEnter={() => setHoveredMetric(index)}
                onMouseLeave={() => setHoveredMetric(null)}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: defaultMotionEase }}
              >
                <div className="metric-shimmer" />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  );
}
