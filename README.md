# Alberta Curtains & Blinds - Pricing Portal

A professional, responsive web-based pricing and estimate portal for Alberta Curtains & Blinds, a window coverings business serving Alberta, Canada.

## Features

### Product Selection
- **7 Blind Types**: Roller, Zebra, Blackout Roller, Cellular/Honeycomb, Vertical, Motorized, Curtains/Drapery
- **5 Curtain Options**: Basic, Light Filtering, Blackout, Premium Drapery, Luxury Custom Drapery
- Product images, descriptions, and starting prices
- Easy selection interface with clear "starting from" pricing

### Customization Options

#### Blind Options
- **Operation**: Standard, Cordless, Motorized
- **Mounting**: Inside Mount, Outside Mount
- **Light Control**: Light Filtering, Blackout
- **Upgrades**: Premium Fabric, Premium Hardware, Smart Home Control

#### Curtain Options
- **Upgrades**: Blackout Lining, Premium Fabric, Extra Length, Custom Pleating, Curtain Rod

### Intelligent Pricing System
- **Dynamic Size Classification**: Small/Medium/Large based on window dimensions
- **Promotional Discount**: 15% automatically applied (clearly visible)
- **Professional Installation**: First window $125, each additional $50
- **GST Calculation**: 5% applied after discount and installation
- **Real-time Calculations**: Updated as options are selected
- **Centralized Configuration**: All pricing easily configurable

### Multi-Step Workflow
1. **Product Selection**: Choose from blind or curtain options
2. **Measurements**: Enter window dimensions and quantity
3. **Options**: Customize operation, mounting, and add upgrades (for blinds)
4. **Estimate Review**: See complete breakdown with all calculations
5. **Lead Capture**: Collect contact information and project preferences
6. **Confirmation**: Thank you page with next steps

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile
- Sticky estimate sidebar on desktop (moves to top on mobile)
- Touch-friendly buttons and form inputs
- Professional aesthetics with modern UI components

### Professional Features
- Progress indicator showing current step and completed steps
- Live estimate calculation sidebar
- Form validation with error messages
- Location selector (Alberta cities)
- Contact method preferences (Email, Phone, SMS)
- Project notes field
- Professional installation information
- Pricing disclaimer
- Confirmation email functionality placeholder

## Technology Stack

- **React 18**: UI framework
- **CSS3**: Responsive styling with flexbox and CSS Grid
- **JavaScript ES6+**: Application logic

## Project Structure

```
├── public/
│   └── index.html                  # HTML template
├── src/
│   ├── components/                 # React components
│   │   ├── PromoBanner.js
│   │   ├── ProductSelection.js
│   │   ├── MeasurementStep.js
│   │   ├── OptionsStep.js
│   │   ├── EstimateReview.js
│   │   ├── QuoteForm.js
│   │   ├── ThankYou.js
│   │   ├── EstimateSidebar.js
│   │   └── *.css                  # Component styles
│   ├── config/
│   │   └── pricing.js             # Centralized pricing configuration
│   ├── utils/
│   │   └── calculations.js        # Pricing calculation logic
│   ├── App.js                     # Main application component
│   ├── App.css                    # Application styles
│   ├── index.js                   # React entry point
│   └── index.css                  # Global styles
├── .gitignore
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm installed

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```
The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Configuration

### Pricing Configuration
All pricing is centralized in `src/config/pricing.js`. To modify:

#### Change Product Prices
```javascript
// In config/pricing.js
products: {
  blinds: [
    {
      id: "roller",
      pricing: {
        small: 125,
        medium: 175,
        large: 275,  // Change these values
      },
    },
  ],
}
```

#### Change Discount Percentage
```javascript
business: {
  promotionDiscount: 0.15, // Change 0.15 to desired percentage (e.g., 0.20 for 20%)
}
```

#### Change Tax Rate
```javascript
business: {
  taxRate: 0.05, // Change 0.05 for different GST rate
}
```

#### Change Installation Pricing
```javascript
installation: {
  professionalInstallation: {
    firstWindow: 125,
    additionalWindow: 50,  // Change these values
  },
}
```

#### Add or Remove Service Locations
```javascript
locations: [
  "Edmonton",
  "Calgary",
  // Add more locations here
]
```

### Adding New Products
```javascript
products: {
  blinds: [
    // existing products...
    {
      id: "new-product",
      name: "New Product Name",
      category: "blinds",
      description: "Product description",
      image: "🪟",  // Use emoji or will work with image file paths later
      pricing: {
        small: 100,
        medium: 150,
        large: 250,
      },
      startingPrice: 100,
    },
  ],
}
```

## Sample Pricing Examples

### Example 1: 4 Zebra Blinds, 60"×72", Professional Installation
- Base Price: $250 × 4 = $1,000
- Discount 15%: -$150
- Installation: $275 (125 + 50×3)
- Subtotal: $1,125
- GST 5%: $56.25
- **Total: $1,181.25 CAD**

### Example 2: 2 Roller Blinds, 36"×60", Customer Installation
- Base Price: $125 × 2 = $250
- Discount 15%: -$37.50
- Installation: $0
- Subtotal: $212.50
- GST 5%: $10.63
- **Total: $223.13 CAD**

### Example 3: 4 Blackout Curtains with Upgrades
- Base Price: $280 × 4 = $1,120
- Upgrades (Blackout Lining, Curtain Rod): $285
- Total Products: $1,405
- Discount 15%: -$210.75
- Installation: $275
- Subtotal: $1,469.25
- GST 5%: $73.46
- **Total: $1,542.71 CAD**

## Size Classification Logic

The system automatically classifies windows into price tiers:

- **Small**: Width ≤ 36" AND Height ≤ 60"
- **Medium**: Width ≤ 60" OR Height ≤ 84"
- **Large**: Anything larger

To modify size thresholds, edit `config/pricing.js`:
```javascript
getSizeCategory(width, height) {
  if (width <= 36 && height <= 60) {
    return "small";
  }
  if (width <= 60 || height <= 84) {
    return "medium";
  }
  return "large";
}
```

## Calculation Formula

The pricing calculation follows this order:

```
1. Base Product Price × Quantity
2. + Selected Options (per unit × quantity)
3. = Product Subtotal
4. - 15% Promotional Discount
5. = Discounted Subtotal
6. + Professional Installation (if selected)
7. = Subtotal Before Tax
8. + 5% GST
9. = Final Estimated Total
```

Note: GST is applied AFTER the discount, not included in it.

## Important Notes

- **Sample Pricing**: This is a demonstration system with sample pricing. It should not be presented as official Alberta Curtains & Blinds pricing.
- **Pricing Disclaimer**: Clearly displayed to customers that estimates are for planning purposes only.
- **Final Measurement**: All quotes emphasize that final pricing is subject to professional measurement.
- **Easy Configuration**: The entire pricing structure can be updated in one configuration file without touching component code.

## Future Enhancements

Possible improvements:
- Integration with email service for quote confirmations
- Database backend for storing quotes and customer information
- Admin dashboard for viewing submitted quotes
- Photo upload for customers to show their windows
- Integration with CRM system
- Quote history for returning customers
- Payment/deposit functionality
- Calendar integration for scheduling measurements

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile

## License

Sample application for demonstration purposes.

---

**Alberta Curtains & Blinds**  
Professional Window Coverings  
Serving Alberta, Canada

*This is a sample pricing portal. Final pricing is subject to measurement and confirmation.*
