import { useEffect } from 'react';

export const usePreezieAIPDPWidget = () => {
  useEffect(() => {
    // Configuration
    const tenantId = "<Please replace with your actual tenant ID>"; // Replace with your actual tenant ID
    const targetSelector = '[data-testid="InfoSection"]'; // CSS selector for the element to insert the widget before or after
    const position: string = "before"; // 'before' or 'after'
    const scriptSrc = "https://widget.shopassistant-ai.com/preguide_ai.js";
    
    // Find the target element
    const targetElement = document.querySelector(targetSelector);
    
    // Check if script container already exists and remove it to ensure clean reload
    // You can use an unique ID for the container to avoid conflicts with other elements
    const existingContainer = document.getElementById("prz-preguide-script-container");
    if (existingContainer) {
      existingContainer.remove();
    }

    if (targetElement) {
      // Create container
      const container = document.createElement("div");
      // You can use an unique ID for the container to avoid conflicts with other elements
      container.id = "prz-preguide-script-container";
      // You can add any necessary styles to the container here
      container.style.display = "block";
      container.style.width = "100%";
      container.style.marginTop = "20px";
      container.style.marginBottom = "20px";
      
      // Create script element
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.setAttribute("data-tenantid", tenantId);
      script.setAttribute("data-app-type", "pdp");
      script.defer = true;
      
      // Append script to container
      container.appendChild(script);
      
      // Insert container relative to the target element
      targetElement.insertAdjacentElement(
        position === "after" ? "afterend" : "beforebegin", 
        container
      );
    }

    // Cleanup function
    return () => {
      const existingContainer = document.getElementById("prz-preguide-script-container");
      if (existingContainer) {
        existingContainer.remove();
      }
    };
  }, []); // Dependencies are now internal constants, so array is empty
};
