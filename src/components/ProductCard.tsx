import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { goTo } from '../utils/navigation';

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = product.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Subtle tilt: max +-4 degrees
    const tiltX = -((y - centerY) / centerY) * 4;
    const tiltY = ((x - centerX) / centerX) * 4;
    setTilt({ x: Number(tiltX.toFixed(2)), y: Number(tiltY.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`product-card ${product.image ? 'has-card-image' : ''} ${
        hovered ? 'is-hovered' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => goTo(product.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          goTo(product.slug);
        }
      }}
      style={{
        animationDelay: `${Math.min(index * 55, 440)}ms`,
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : undefined,
      }}
    >
      <div className="card-shimmer-line" />

      {product.image ? (
        <div className="product-card-banner">
          <img
            src={product.image}
            alt={product.title}
            className="product-banner-img"
            loading="lazy"
          />
          <div className="product-banner-overlay" />
          <div className="product-banner-top">
            <span className="card-number banner-number">{product.number}</span>
            <div className="product-icon banner-icon">
              <Icon size={18} />
            </div>
          </div>
        </div>
      ) : (
        <div className="card-top">
          <span className="card-number">{product.number}</span>
          <div className="product-icon">
            <Icon size={20} />
          </div>
        </div>
      )}

      <div className="card-content">
        <span className="card-tag">{product.tag}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span className="card-link">
          View details <ArrowRight size={15} />
        </span>
      </div>
    </div>
  );
}

