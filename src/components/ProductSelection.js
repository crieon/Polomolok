import React from "react";
import config, { DISCLAIMER } from "../config/pricing";
import { formatCurrency } from "../utils/calculations";
import "./ProductSelection.css";

const ProductSelection = ({ onSelectProduct }) => {
  return (
    <div className="step-container">
      <div className="progress-indicator">
        <div className="progress-step active">
          <div className="progress-dot">1</div>
          <span>Product</span>
        </div>
        <div className="progress-step">
          <div className="progress-dot">2</div>
          <span>Measurements</span>
        </div>
        <div className="progress-step">
          <div className="progress-dot">3</div>
          <span>Options</span>
        </div>
        <div className="progress-step">
          <div className="progress-dot">4</div>
          <span>Estimate</span>
        </div>
        <div className="progress-step">
          <div className="progress-dot">5</div>
          <span>Quote</span>
        </div>
      </div>

      <h2 className="step-title">Choose Your Product</h2>
      <p className="step-subtitle">
        Select the window covering that best fits your needs
      </p>

      <div className="product-section">
        <h3 className="section-title">Blinds</h3>
        <div className="product-grid">
          {config.products.blinds.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-icon">{product.image}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">
                  {formatCurrency(product.startingPrice)}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => onSelectProduct(product.id, "blinds")}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="product-section">
        <h3 className="section-title">Curtains & Drapery</h3>
        <div className="product-grid">
          {config.products.curtains.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-icon">{product.image}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">
                  {formatCurrency(product.startingPrice)}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => onSelectProduct(product.id, "curtains")}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box">
        <strong>Sample Pricing Information:</strong>
        <p>
          Prices shown are sample estimates. Final pricing depends on
          measurements, materials, options and installation requirements.
        </p>
      </div>

      <div className="disclaimer-box">
        <p>{DISCLAIMER}</p>
      </div>
    </div>
  );
};

export default ProductSelection;
