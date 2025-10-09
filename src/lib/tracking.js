// Tracking utility for pixel and UTM parameters
export class TrackingManager {
  constructor() {
    this.pixelId = "68e6c1df587e50ffa60acd08";
    this.utmParams = {};
    this.init();
  }

  init() {
    // Load pixel script if not already loaded
    this.loadPixelScript();
    
    // Extract UTM parameters from URL
    this.extractUTMParameters();
    
    // Set up page view tracking
    this.trackPageView();
  }

  loadPixelScript() {
    // Check if pixel script is already loaded
    if (document.querySelector('script[src*="cdn.utmify.com.br/scripts/pixel/pixel.js"]')) {
      return;
    }

    // Set pixel ID in global scope
    window.pixelId = this.pixelId;

    // Create and append pixel script
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    script.setAttribute('src', 'https://cdn.utmify.com.br/scripts/pixel/pixel.js');
    document.head.appendChild(script);

    console.log('Pixel script loaded successfully');
  }

  extractUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};

    // Extract UTM parameters
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    // Store UTM parameters
    this.utmParams = utmParams;
    
    // Store in localStorage for persistence across sessions
    if (Object.keys(utmParams).length > 0) {
      localStorage.setItem('utm_params', JSON.stringify(utmParams));
    }

    // Also try to get from localStorage if not in URL
    if (Object.keys(utmParams).length === 0) {
      const storedParams = localStorage.getItem('utm_params');
      if (storedParams) {
        this.utmParams = JSON.parse(storedParams);
      }
    }

    console.log('UTM Parameters extracted:', this.utmParams);
  }

  trackPageView(pageName = null) {
    // Get current page name if not provided
    const currentPage = pageName || this.getCurrentPageName();
    
    // Track page view with pixel
    if (window.utmify && window.utmify.track) {
      window.utmify.track('page_view', {
        page: currentPage,
        ...this.utmParams
      });
    }

    console.log(`Page view tracked: ${currentPage}`, this.utmParams);
  }

  trackEvent(eventName, eventData = {}) {
    if (window.utmify && window.utmify.track) {
      window.utmify.track(eventName, {
        ...eventData,
        ...this.utmParams
      });
    }

    console.log(`Event tracked: ${eventName}`, eventData, this.utmParams);
  }

  getCurrentPageName() {
    const path = window.location.pathname;
    
    // Map routes to readable page names
    const pageMap = {
      '/': 'landing',
      '/identificacao': 'identification',
      '/validacao': 'coupon_validation',
      '/limite-atingido': 'limit_reached',
      '/metodo-saque': 'withdrawal_method',
      '/confirmacao-seguranca': 'security_confirmation',
      '/final': 'final',
      '/checkout': 'checkout'
    };

    // Handle dynamic routes like /validacao/:step
    if (path.startsWith('/validacao/')) {
      return 'coupon_validation';
    }

    return pageMap[path] || 'unknown';
  }

  // Method to track specific user actions
  trackUserAction(action, data = {}) {
    this.trackEvent(`user_action_${action}`, data);
  }

  // Method to track conversions
  trackConversion(conversionType, value = null) {
    const conversionData = {
      type: conversionType,
      timestamp: new Date().toISOString(),
      ...this.utmParams
    };

    if (value !== null) {
      conversionData.value = value;
    }

    this.trackEvent('conversion', conversionData);
  }
}

// Create global instance
export const trackingManager = new TrackingManager();

// Export for use in components
export default trackingManager;
