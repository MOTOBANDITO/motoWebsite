// src/pages/ShopPage.jsx - The Single, Correct Version

import React, { useState, useEffect } from 'react';
import Client from 'shopify-buy';
import philip from '../assets/philip_cutout.png';
import './ShopPage.css';

// Initialize the Shopify client
const client = Client.buildClient({
  domain: '1322d4-c2.myshopify.com',
  storefrontAccessToken: 'b4f4df17fac4f1722af01b69d922890a',
});

// This is the one and only ShopPage function definition
function ShopPage() {
  const [products, setProducts] = useState([]);
  const collectionId = 'gid://shopify/Collection/299546673335';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const collection = await client.collection.fetchWithProducts(collectionId);
        setProducts(collection.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [collectionId]);

  if (!products.length) {
    return <p>Loading products...</p>;
  }

// src/pages/ShopPage.jsx

// ... (keep the top of the file the same) ...

  return (
    <>
      {/* --- THIS IS THE NEW REACT 19 SEO METHOD --- */}
      {/* Add your title and meta tags directly here */}
      <title>Shop Official Merch - MOTO BANDIT</title>
      <meta name="description" content="Official t-shirts, music, and more from MOTO BANDIT. Support the band directly from our store." />
      
      {/* --- The rest of your page component --- */}
    <div className='shop-page'>
      <div className="product-grid">
        {products.map((product) => (
          // ... (your existing product card code) ...
          <div key={product.id} className="product-card">
            <a href={product.onlineStoreUrl} target="_blank" rel="noopener noreferrer">
              <div className="product-image-container">
                <img src={product.images[0].src} alt={product.title} />
                <div className="product-info-overlay">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.variants[0].price.amount}</p>
                </div>
                {!product.availableForSale && (
                  <div className="sold-out-banner">SOLD OUT</div>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
      
      {/* --- GIVE THIS DIV A CLASS NAME --- */}
      <div className="side-image-container">
        <img src={philip} alt="Side graphic" />
      </div>
    </div>
    </>
  );
}

export default ShopPage;