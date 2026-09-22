import React from "react";
import { formatCurrency, getProductName } from "../utils/calculations";
import "./EstimateReview.css";

const EstimateReview = ({ quote, estimate, onConfirm, onBack, config }) => {
  if (!estimate) return null;

  const productName = getProductName(
    quote.product,
    quote.productCategory,
    config
  );

  const getOptionsSummary = () => {
    const parts = [];
    if (quote.productCategory === "blinds") {
      const op = config.blindOptions.operation.options.find(
        (o) => o.id === quote.operation
      );
      if (op) parts.push(op.label);

      const lc = config.blindOptions.lightControl.options.find(
        (o) => o.id === quote.lightControl
      );
      if (lc) parts.push(lc.label);
    }

    return parts.length > 0 ? parts.join(" • ") : "Standard options";
  };

  return (
    <div className="step-container">
      <div className="progress-indicator">
        <div className="progress-step completed">
          <div className="progress-dot">✓</div>
          <span>Product</span>
        </div>
        <div className="progress-step completed">
          <div className="progress-dot">✓</div>
          <span>Measurements</span>
        </div>
        <div className="progress-step completed">
          <div className="progress-dot">✓</div>
          <span>Options</span>
        </div>
        <div className="progress-step active">
          <div className="progress-dot">4</div>
          <span>Estimate</span>
        </div>
        <div className="progress-step">
          <div className="progress-dot">5</div>
          <span>Quote</span>
        </div>
      </div>

      <h2 className="step-title">Your Estimate</h2>
      <p className="step-subtitle">Review your quote before requesting</p>

      <div className="estimate-review-container">
        <div className="quote-summary">
          <div className="summary-header">
            <h3>Alberta Curtains & Blinds</h3>
            <p>ESTIMATED QUOTE</p>
          </div>

          <div className="summary-details">
            <p>
              <strong>{quote.quantity}×</strong> {productName}
            </p>
            <p>
              {quote.width}″ × {quote.height}″
            </p>
            {quote.productCategory === "blinds" && (
              <p className="options-summary">{getOptionsSummary()}</p>
            )}
          </div>

          <div className="calculation-breakdown">
            <div className="calc-line">
              <span>Base Price</span>
              <span className="amount">
                {formatCurrency(estimate.productSubtotal)}
              </span>
            </div>

            <div className="calc-line discount">
              <span>Promotional Discount (15%)</span>
              <span className="amount negative">
                -{formatCurrency(estimate.discountAmount)}
              </span>
            </div>

            <div className="calc-line divider">
              <span>Product Subtotal</span>
              <span className="amount">
                {formatCurrency(estimate.discountedSubtotal)}
              </span>
            </div>

            {estimate.installationCost > 0 && (
              <div className="calc-line">
                <span>Professional Installation</span>
                <span className="amount">
                  {formatCurrency(estimate.installationCost)}
                </span>
              </div>
            )}

            <div className="calc-line divider">
              <span>Subtotal Before Tax</span>
              <span className="amount">
                {formatCurrency(estimate.subtotalBeforeTax)}
              </span>
            </div>

            <div className="calc-line">
              <span>GST (5%)</span>
              <span className="amount">{formatCurrency(estimate.gst)}</span>
            </div>
          </div>

          <div className="discount-badge">
            SAVE {formatCurrency(estimate.discountAmount)} TODAY
          </div>

          <div className="final-total">
            <span>ESTIMATED TOTAL</span>
            <div className="total-amount">
              {formatCurrency(estimate.total)} CAD
            </div>
          </div>

          <div className="disclaimer-note">
            <p>
              Final price subject to professional measurement and confirmation.
            </p>
          </div>
        </div>

        <div className="estimate-actions">
          <div className="action-group">
            <button className="btn btn-primary btn-large" onClick={onConfirm}>
              Request Final Quote
            </button>
            <button className="btn btn-secondary btn-large" onClick={onBack}>
              Modify Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateReview;
