// src/pages/UnlockSongPage.jsx

import React, { useState, useEffect } from 'react';
import Client from 'shopify-buy';
import './UnlockSongPage.css'; // We will create this CSS file next

// Initialize the Shopify client (same as on the shop page)
const client = Client.buildClient({
  domain: '1322d4-c2.myshopify.com',
  storefrontAccessToken: 'b4f4df17fac4f1722af01b69d922890a',
});

// The named export for your router
export const UnlockSongPage = () => {
  const [product, setProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // --- IMPORTANT ---
  // Replace this with the GID of the song product you just created
  const productId = 'gid://shopify/Product/8187664892087'; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await client.product.fetch(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleBuyNow = async () => {
    if (!product || !product.variants[0]) return;

    setIsProcessing(true);
    
    try {
      // 1. Create a new checkout
      const checkout = await client.checkout.create();
      
      // 2. Add the song to the checkout
      const lineItemsToAdd = [{
        variantId: product.variants[0].id,
        quantity: 1,
      }];
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);

      // 3. Redirect the user to the checkout page
      window.location.href = updatedCheckout.webUrl;

    } catch (error) {
      console.error("Failed to create checkout:", error);
      setIsProcessing(false);
    }
  };

  if (!product) {
    return <p className="loading-message">Loading Song...</p>;
  }

  return (
    <>
  <title>MOTO BANDIT | Unlock Exclusive Demo</title>
  <meta name="description" content="Get access to an exclusive, unreleased demo from MOTO BANDIT. Download the track directly from the band." />

  {/* The rest of your unlock song page component... */}
    <div className="unlock-song-container">
      <div className="song-artwork">
        <img src={product.images[0].src} alt={product.title} />
      </div>
      <div className="song-details">
        <h1 className="song-title">{product.title}</h1>
        <p className="song-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
        <p className="song-price">${product.variants[0].price.amount}0</p>
        <button 
          className="buy-now-button" 
          onClick={handleBuyNow} 
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Buy Now for $${product.variants[0].price.amount}0`}
        </button>
      </div>
    </div>
    </>
  );
};