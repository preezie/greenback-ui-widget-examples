# preezie AI Shopping Assistant - Next.js Integration Guide

This guide explains how to integrate the preezie AI Shopping Assistant into a Next.js application.

## 1. Global Trigger Script

To load the AI assistant trigger button across your entire site, add the script to your root layout file (`app/layout.tsx`).

We recommend using the Next.js `Script` component with `strategy="afterInteractive"` for optimal performance.

**File:** `next-app/app/layout.tsx`

```tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Load the AI shopping assistant trigger script site-wide */}
        <Script 
          src="https://widget.shopassistant-ai.com/preguide_ai.js" 
          data-tenantid="YOUR_TENANT_ID" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

## 2. Product Detail Page (PDP) Widget

To keep your components clean, we recommend creating a custom hook to handle the widget injection.

### Step 1: Create the Hook

**File:** `next-app/hooks/usePreezieAIPDPWidget.ts`

```typescript
import { useEffect } from 'react';

export const usePreezieAIPDPWidget = () => {
  useEffect(() => {
    // Configuration
    const tenantId = "YOUR_TENANT_ID"; 
    const targetSelector = '[data-testid="InfoSection"]'; // CSS selector for the element to insert the widget before or after
    const position = "before";
    const scriptSrc = "https://widget.shopassistant-ai.com/preguide_ai.js";

    const targetElement = document.querySelector(targetSelector);
    
    // Clean up existing to ensure clean reload
    // You can use an unique ID for the container to avoid conflicts with other elements
    const existingContainer = document.getElementById("prz-preguide-script-container");
    if (existingContainer) existingContainer.remove();

    if (targetElement) {
      const container = document.createElement("div");
      // You can use an unique ID for the container to avoid conflicts with other elements
      container.id = "prz-preguide-script-container";
      // You can add any necessary styles to the container here
      container.style.width = "100%";
      container.style.marginTop = "20px";
      container.style.marginBottom = "20px";
      
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.setAttribute("data-tenantid", tenantId);
      script.setAttribute("data-app-type", "pdp");
      script.defer = true;
      
      container.appendChild(script);
      
      targetElement.insertAdjacentElement(
        position === "after" ? "afterend" : "beforebegin", 
        container
      );
    }

    // Cleanup on unmount
    return () => {
      // You can use an unique ID for the container to avoid conflicts with other elements
      const existing = document.getElementById("prz-preguide-script-container");
      if (existing) existing.remove();
    };
  }, []);
};
```

### Step 2: Use in your Page

**File:** `next-app/app/[productName]/page.tsx`

```tsx
'use client';

// Import the custom hook (adjust path as needed)
import { usePreezieAIPDPWidget } from '@/hooks/usePreezieAIPDPWidget';

export default function ProductPage({ params }: { params: { productName: string } }) {
  // Call the hook
  usePreezieAIPDPWidget();

  return (
    <div>
      <h1>Product Page</h1>
      
      {/* The widget will be inserted relative to this element */}
      <div data-testid="InfoSection">
        {/* Product details... */}
      </div>
    </div>
  );
}
```

### Key Implementation Details

1.  **Cleaner Logic**: Abstracting the DOM manipulation into a hook (`usePreezieWidget`) keeps your Next.js page components readable.
2.  **Dependencies**: The `useEffect` dependency array in the `usePreezieAIPDPWidget` hook is empty `[]` by default, meaning the script loads once when the component mounts. If you need the widget to reload when specific data changes (e.g., product selection), you can add those variables to the dependency array, but **use cautiously**—frequent reloads may cause flickering or performance issues.
