import type { LucideIcon } from 'lucide-react';

export type ProductSlug =
  | 'solar-power-plants'
  | 'solar-pump-systems'
  | 'solar-water-heaters'
  | 'solar-water-heaters-etc'
  | 'solar-water-heaters-fpc'
  | 'solar-street-lights'
  | 'solar-street-lights-wall'
  | 'solar-street-lights-pole'
  | 'home-ups-inverter'
  | 'solar-fencing-dryer'
  | 'cctv-iot-automation'
  | 'water-softeners-ro';

export type Page =
  | 'home'
  | 'about'
  | 'products'
  | 'clients'
  | 'gallery'
  | 'contact'
  | 'admin'
  | ProductSlug;

export type Product = {
  number: string;
  slug: ProductSlug;
  title: string;
  description: string;
  detail: string;
  benefits: string[];
  icon: LucideIcon;
  tag: string;
  image?: string;
  fullOverview?: string[];
  features?: string[];
  specifications?: { label: string; value: string }[];
  applications?: string[];
};

export type Client = {
  name: string;
  image?: string;
};

export type GalleryCategory =
  | 'all'
  | 'solar-rooftop'
  | 'water-heating'
  | 'solar-lighting'
  | 'security-cctv';

export type GalleryItem = {
  _id?: string;
  id: string;
  title: string;
  category: GalleryCategory | string;
  categoryLabel: string;
  location: string;
  description: string;
  image?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  thumbnailUrl?: string;
  tag: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  createdAt?: string;
};
