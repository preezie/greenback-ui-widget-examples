'use client';

import Link from 'next/link';
import { usePreezieAIPDPWidget } from '@/hooks/usePreezieAIPDPWidget';

export default function ProductPage({ params }: { params: { productName: string } }) {
  const productName = decodeURIComponent(params.productName);

  const otherProduct = productName === 'product-a' ? 'product-b' : 'product-a';

  usePreezieAIPDPWidget();

  return (
    <div>
      <h1>Product: {productName}</h1>
      
      <div data-testid="InfoSection"></div>

      <div style={{ marginTop: '20px' }}>
        <p>Switch to another product:</p>
        <Link 
          href={`/${otherProduct}`}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#f47f52', 
            color: 'white', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}
        >
          Check out {otherProduct} &rarr;
        </Link>
      </div>
    </div>
  );
}
