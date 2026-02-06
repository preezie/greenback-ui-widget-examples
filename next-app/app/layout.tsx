import Link from 'next/link';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <Script 
          src="https://widget.shopassistant-ai.com/preguide_ai.js" 
          data-tenantid="<Please replace with your actual tenant ID>" 
          strategy="afterInteractive"
        />
        <header style={{ 
          padding: '1rem 2rem', 
          backgroundColor: '#f0f0f0', 
          borderBottom: '1px solid #ddd',
          display: 'flex',
          gap: '20px'
        }}>
          <strong>AI shopping assistant example</strong>
          <nav style={{ display: 'flex', gap: '15px' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#f47f52' }}>Home</Link>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
