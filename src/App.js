import React, { useState } from "react";
import "./App.css";
import config from "./config/pricing";
import { calculateEstimate, formatCurrency } from "./utils/calculations";

import PromoBanner from "./components/PromoBanner";
import ProductSelection from "./components/ProductSelection";
import MeasurementStep from "./components/MeasurementStep";
import OptionsStep from "./components/OptionsStep";
import EstimateReview from "./components/EstimateReview";
import QuoteForm from "./components/QuoteForm";
import ThankYou from "./components/ThankYou";
import EstimateSidebar from "./components/EstimateSidebar";

function App() {
  const [step, setStep] = useState("promo"); // promo, product, measurement, options, estimate, form, thanks
  const [quote, setQuote] = useState({
    product: null,
    productCategory: null,
    width: 48,
    height: 60,
    quantity: 1,
    operation: "standard",
    mounting: "inside",
    lightControl: "light-filtering",
    upgrades: [],
    installation: "professional",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerCity: "",
    customerPostal: "",
    contactMethod: "email",
    notes: "",
  });

  const estimate = calculateEstimate(quote, config);

  const handleProductSelect = (productId, category) => {
    setQuote((prev) => ({
      ...prev,
      product: productId,
      productCategory: category,
    }));
    setStep("measurement");
  };

  const handleMeasurementSubmit = (width, height, quantity) => {
    setQuote((prev) => ({
      ...prev,
      width: parseFloat(width),
      height: parseFloat(height),
      quantity: parseInt(quantity),
    }));
    if (quote.productCategory === "curtains") {
      setStep("estimate");
    } else {
      setStep("options");
    }
  };

  const handleOptionsSubmit = (selectedOptions) => {
    setQuote((prev) => ({
      ...prev,
      ...selectedOptions,
    }));
    setStep("estimate");
  };

  const handleEstimateConfirm = () => {
    setStep("form");
  };

  const handleFormSubmit = (formData) => {
    setQuote((prev) => ({
      ...prev,
      ...formData,
    }));
    setStep("thanks");
  };

  const handleStartOver = () => {
    setQuote({
      product: null,
      productCategory: null,
      width: 48,
      height: 60,
      quantity: 1,
      operation: "standard",
      mounting: "inside",
      lightControl: "light-filtering",
      upgrades: [],
      installation: "professional",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerCity: "",
      customerPostal: "",
      contactMethod: "email",
      notes: "",
    });
    setStep("promo");
  };

  return (
    <div className="app">
      {step === "thanks" ? (
        <ThankYou quote={quote} onStartOver={handleStartOver} />
      ) : (
        <>
          <PromoBanner
            onGetEstimate={() => setStep("product")}
            hideButton={step !== "promo"}
          />

          <div className="main-container">
            <div className="content">
              {step === "promo" && (
                <div className="hero-section">
                  <h1>Alberta Curtains & Blinds</h1>
                  <p>Professional window coverings for Alberta homes</p>
                  <button
                    className="cta-button"
                    onClick={() => setStep("product")}
                  >
                    Get Your Estimate
                  </button>
                </div>
              )}

              {step === "product" && (
                <ProductSelection onSelectProduct={handleProductSelect} />
              )}

              {step === "measurement" && (
                <MeasurementStep
                  productCategory={quote.productCategory}
                  onSubmit={handleMeasurementSubmit}
                  onBack={() => setStep("product")}
                  defaultWidth={quote.width}
                  defaultHeight={quote.height}
                  defaultQuantity={quote.quantity}
                />
              )}

              {step === "options" && (
                <OptionsStep
                  onSubmit={handleOptionsSubmit}
                  onBack={() => setStep("measurement")}
                  currentOptions={{
                    operation: quote.operation,
                    mounting: quote.mounting,
                    lightControl: quote.lightControl,
                    upgrades: quote.upgrades,
                    installation: quote.installation,
                  }}
                />
              )}

              {step === "estimate" && (
                <EstimateReview
                  quote={quote}
                  estimate={estimate}
                  onConfirm={handleEstimateConfirm}
                  onBack={() =>
                    setStep(quote.productCategory === "curtains" ? "measurement" : "options")
                  }
                  config={config}
                />
              )}

              {step === "form" && (
                <QuoteForm
                  onSubmit={handleFormSubmit}
                  onBack={() => setStep("estimate")}
                />
              )}
            </div>

            {step !== "promo" && step !== "thanks" && (
              <EstimateSidebar quote={quote} estimate={estimate} config={config} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
