import React, { useEffect, useState } from 'react';
import type { Page, ProductSlug } from './types';
import { products, productSlugs } from './data/products';
import { getPage, goTo } from './utils/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingSocials } from './components/FloatingSocials';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Clients } from './pages/Clients';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { ProductDetail } from './pages/ProductDetail';
import { Admin } from './pages/Admin';

export default function App(): React.ReactElement {
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const handlePopState = () => setPage(getPage());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (next: Page) => {
    goTo(next);
    setPage(next);
  };

  // Dedicated Admin Portal (Invisible in public navigation; accessed via /admin)
  if (page === 'admin') {
    return <Admin navigate={navigate} />;
  }

  const currentProduct = productSlugs.includes(page as ProductSlug)
    ? products.find((p) => p.slug === page) ||
    (page === 'solar-water-heaters' ? products.find((p) => p.slug === 'solar-water-heaters-etc') : undefined) ||
    (page === 'solar-street-lights' ? products.find((p) => p.slug === 'solar-street-lights-pole') : undefined)
    : undefined;

  return (
    <div className="site-shell">
      <Header currentPage={page} navigate={navigate} />

      <main>
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'about' && <About navigate={navigate} />}
        {page === 'products' && <Products navigate={navigate} />}
        {page === 'clients' && <Clients navigate={navigate} />}
        {page === 'gallery' && <Gallery navigate={navigate} />}
        {page === 'contact' && <Contact />}
        {currentProduct ? (
          <ProductDetail product={currentProduct} navigate={navigate} />
        ) : null}
      </main>

      <Footer navigate={navigate} />
      <FloatingSocials />
    </div>
  );
}
