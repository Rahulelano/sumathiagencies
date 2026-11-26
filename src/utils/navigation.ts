import type { Page, ProductSlug } from '../types';
import { productSlugs } from '../data/products';

export const whatsappNumbers = ['9600299942', '9600799942'];
export const officeNumber = '9600299942';
export const officeNumberDisplay = '+91 96002 99942';
export const officeSecondaryNumber = '9600799942';
export const officeSecondaryNumberDisplay = '+91 96007 99942';
export const officeLandlineNumber = '9486099942';
export const officeLandlineNumberDisplay = '+91 94860 99942';
export const contactPersonName = 'Chezian';
export const officialEmail = 'info@sumathiagencies.com';
export const salesEmail = 'sales.sumathiagencies@gmail.com';

/**
 * Returns a direct WhatsApp chat link to +91 96002 99942 in valid wa.me international format.
 */
export function whatsappLink(
  message = 'Hello Sumathi Agencies, I would like to know more about your solar solutions.',
  phone = '9600299942'
) {
  const digits = phone.replace(/\D/g, '');
  const internationalNumber = digits.startsWith('91') && digits.length === 12 ? digits : `91${digits.slice(-10)}`;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}

export function goTo(page: Page) {
  window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function getPage(): Page {
  const path = window.location.pathname.replace(/^\//, '');
  if (
    path === 'about' ||
    path === 'products' ||
    path === 'clients' ||
    path === 'gallery' ||
    path === 'contact' ||
    path === 'admin' ||
    productSlugs.includes(path as ProductSlug)
  ) {
    return path as Page;
  }
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (
    hash === 'about' ||
    hash === 'products' ||
    hash === 'clients' ||
    hash === 'gallery' ||
    hash === 'contact' ||
    hash === 'admin' ||
    productSlugs.includes(hash as ProductSlug)
  ) {
    return hash as Page;
  }
  return 'home';
}
