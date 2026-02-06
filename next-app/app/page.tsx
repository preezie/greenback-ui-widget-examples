import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>AI shopping assistant example</h1>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Link 
          href="/product-a" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#f47f52', 
            color: 'white', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}
        >
          Go to Product A &rarr;
        </Link>
        <Link 
          href="/product-b" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#f47f52', 
            color: 'white', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}
        >
          Go to Product B &rarr;
        </Link>
      </div>
    </div>
  );
}
