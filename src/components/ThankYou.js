import React from "react";
import { formatCurrency } from "../utils/calculations";
import "./ThankYou.css";

const ThankYou = ({ quote, onStartOver }) => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="success-icon">✓</div>
        <h1>Thank You!</h1>
        <p className="subtitle">Your quote request has been received</p>

        <div className="confirmation-details">
          <div className="detail-item">
            <span className="label">Name</span>
            <span className="value">{quote.customerName}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email</span>
            <span className="value">{quote.customerEmail}</span>
          </div>
          <div className="detail-item">
            <span className="label">Phone</span>
            <span className="value">{quote.customerPhone}</span>
          </div>
          <div className="detail-item">
            <span className="label">City</span>
            <span className="value">{quote.customerCity}</span>
          </div>
          <div className="detail-item">
            <span className="label">Estimated Total</span>
            <span className="value highlight">
              {formatCurrency(
                quote.productSubtotal -
                  quote.productSubtotal *
                    0.15 +
                  (quote.installation === "professional"
                    ? 125 + (quote.quantity - 1) * 50
                    : 0)
              )}{" "}
              CAD
            </span>
          </div>
        </div>

        <div className="next-steps">
          <h3>What Happens Next?</h3>
          <ol>
            <li>
              Our team will review your estimate and project details within 24
              hours
            </li>
            <li>
              We'll contact you via {quote.contactMethod} to confirm your
              measurement appointment
            </li>
            <li>
              One of our professionals will visit your location to take precise
              measurements
            </li>
            <li>
              You'll receive a final customized quote after the measurement
            </li>
          </ol>
        </div>

        <div className="info-message">
          <p>
            <strong>Check your email</strong> – A confirmation message has been
            sent to {quote.customerEmail}
          </p>
        </div>

        <button className="btn btn-primary btn-large" onClick={onStartOver}>
          Get Another Estimate
        </button>
      </div>

      <div className="footer-text">
        <p>
          Questions? Contact us at <strong>1-800-BLINDS-AB</strong> or visit
          our showroom.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
