// Central pricing configuration for Alberta Curtains & Blinds
// All prices are in CAD

export const config = {
  business: {
    name: "Alberta Curtains & Blinds",
    currency: "CAD",
    taxRate: 0.05, // 5% GST
    promotionDiscount: 0.15, // 15% promotional discount
  },

  products: {
    blinds: [
      {
        id: "roller",
        name: "Roller Blind",
        category: "blinds",
        description: "Classic roller blinds - simple and elegant",
        image: "🪟",
        pricing: {
          small: 125,
          medium: 175,
          large: 275,
        },
        startingPrice: 125,
      },
      {
        id: "zebra",
        name: "Zebra Blind",
        category: "blinds",
        description: "Modern zebra sheer blinds with alternating stripes",
        image: "🪟",
        pricing: {
          small: 175,
          medium: 250,
          large: 350,
        },
        startingPrice: 175,
      },
      {
        id: "blackout-roller",
        name: "Blackout Roller Blind",
        category: "blinds",
        description: "Complete light blocking for bedrooms",
        image: "🪟",
        pricing: {
          small: 175,
          medium: 250,
          large: 375,
        },
        startingPrice: 175,
      },
      {
        id: "cellular",
        name: "Cellular / Honeycomb Blind",
        category: "blinds",
        description: "Energy-efficient cellular design with thermal insulation",
        image: "🪟",
        pricing: {
          small: 225,
          medium: 325,
          large: 475,
        },
        startingPrice: 225,
      },
      {
        id: "vertical",
        name: "Vertical Blind",
        category: "blinds",
        description: "Vertical slats for large windows and sliding doors",
        image: "🪟",
        pricing: {
          small: 225,
          medium: 325,
          large: 500,
        },
        startingPrice: 225,
      },
      {
        id: "motorized",
        name: "Motorized Blind",
        category: "blinds",
        description: "Smart motorized blinds with remote or app control",
        image: "🪟",
        pricing: {
          small: 450,
          medium: 600,
          large: 850,
        },
        startingPrice: 450,
      },
    ],

    curtains: [
      {
        id: "basic-curtain",
        name: "Basic Curtain",
        category: "curtains",
        description: "Simple, affordable curtains for any room",
        image: "🎭",
        startingPrice: 180,
      },
      {
        id: "light-filtering",
        name: "Light Filtering Curtain",
        category: "curtains",
        description: "Soft, diffused light for a bright room",
        image: "🎭",
        startingPrice: 220,
      },
      {
        id: "blackout-curtain",
        name: "Blackout Curtain",
        category: "curtains",
        description: "Complete darkness - perfect for bedrooms",
        image: "🎭",
        startingPrice: 280,
      },
      {
        id: "premium-drapery",
        name: "Premium Drapery",
        category: "curtains",
        description: "High-quality fabric with professional finishing",
        image: "🎭",
        startingPrice: 350,
      },
      {
        id: "luxury-drapery",
        name: "Luxury Custom Drapery",
        category: "curtains",
        description: "Bespoke custom-tailored drapery with premium materials",
        image: "🎭",
        startingPrice: 500,
      },
    ],
  },

  blindOptions: {
    operation: {
      label: "Operation",
      options: [
        { id: "standard", label: "Standard", price: 0 },
        { id: "cordless", label: "Cordless", price: 50 },
        { id: "motorized", label: "Motorized", price: 250 },
      ],
      default: "standard",
    },

    mounting: {
      label: "Mounting",
      options: [
        { id: "inside", label: "Inside Mount", price: 0 },
        { id: "outside", label: "Outside Mount", price: 0 },
      ],
      default: "inside",
    },

    lightControl: {
      label: "Light Control",
      options: [
        { id: "light-filtering", label: "Light Filtering", price: 0 },
        { id: "blackout", label: "Blackout", price: 75 },
      ],
      default: "light-filtering",
    },

    upgrades: [
      { id: "premium-fabric", label: "Premium Fabric", price: 50 },
      { id: "premium-hardware", label: "Premium Hardware", price: 35 },
      { id: "smart-home", label: "Smart Home Control", price: 150 },
    ],
  },

  curtainOptions: {
    upgrades: [
      { id: "blackout-lining", label: "Blackout Lining", price: 60 },
      { id: "premium-fabric", label: "Premium Fabric (+$50 to $150)", price: 100 },
      { id: "extra-length", label: "Extra Length (+$25 to $75)", price: 50 },
      { id: "custom-pleating", label: "Custom Pleating", price: 70 },
      { id: "curtain-rod", label: "Curtain Rod (+$150 to $325)", price: 225 },
    ],
  },

  installation: {
    customerInstallation: 0,
    professionalInstallation: {
      firstWindow: 125,
      additionalWindow: 50,
    },
  },

  // Size classification logic
  getSizeCategory(width, height) {
    // Small: width <= 36" AND height <= 60"
    if (width <= 36 && height <= 60) {
      return "small";
    }
    // Medium: width <= 60" OR height <= 84"
    if (width <= 60 || height <= 84) {
      return "medium";
    }
    // Large: anything else
    return "large";
  },

  locations: [
    "Edmonton",
    "Calgary",
    "Red Deer",
    "Lethbridge",
    "Grande Prairie",
    "Airdrie",
    "St. Albert",
    "Sherwood Park",
    "Other Alberta Location",
  ],
};

// Disclaimer text
export const DISCLAIMER = `Pricing Disclaimer: Prices shown on this website are estimates based on the information provided and are intended for planning purposes only. Final pricing may vary based on confirmed measurements, selected materials, installation requirements, product availability and other project specifications. A final quote will be provided after measurement and consultation.`;

export default config;
