import React from "react";
import { formatCurrency, getProductName } from "../utils/calculations";
import "./EstimateSidebar.css";

const EstimateSidebar = ({ quote, estimate, config }) => {
  if (!estimate) {
    return (
      <div className="estimate-sidebar">
        <div className="estimate-card">
          <h3>Your Estimate</h3>
          <p className="empty-state">
            Select a product to get started calculating your estimate.
          </p>
        </div>
      </div>
    );
  }

  const productName = getProductName(
    quote.product,
    quote.productCategory,
    config
  );

  return (
    <div className="estimate-sidebar">
      <div className="estimate-card sticky-estimate">
        <h3>YOUR ESTIMATE</h3>

        {productName && (
          <div className="estimate-summary">
            <p className="product-name">{productName}</p>
            <p className="product-size">
              {quote.width}" × {quote.height}"
            </p>
            <p className="quantity">Qty: {quote.quantity}</p>
          </div>
        )}

        <div className="estimate-breakdown">
          <div className="estimate-line">
            <span>Base Price</span>
            <span className="amount">
              {formatCurrency(estimate.productSubtotal)}
            </span>
          </div>

          {estimate.discountAmount > 0 && (
            <div className="estimate-line discount">
              <span>Discount 15%</span>
              <span className="amount negative">
                -{formatCurrency(estimate.discountAmount)}
              </span>
            </div>
          )}

          {estimate.installationCost > 0 && (
            <div className="estimate-line">
              <span>Installation</span>
              <span className="amount">
                {formatCurrency(estimate.installationCost)}
              </span>
            </div>
          )}

          <div className="estimate-line">
            <span>GST (5%)</span>
            <span className="amount">{formatCurrency(estimate.gst)}</span>
          </div>

          <div className="estimate-line total">
            <span>Total</span>
            <span className="amount">{formatCurrency(estimate.total)}</span>
          </div>
        </div>

        <div className="savings-badge">
          SAVE {formatCurrency(estimate.discountAmount)}
        </div>
      </div>
    </div>
  );
};

export default EstimateSidebar;
