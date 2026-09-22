import React, { useState } from "react";
import "./MeasurementStep.css";

const MeasurementStep = ({
  productCategory,
  onSubmit,
  onBack,
  defaultWidth = 48,
  defaultHeight = 60,
  defaultQuantity = 1,
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [quantity, setQuantity] = useState(defaultQuantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (width && height && quantity) {
      onSubmit(width, height, quantity);
    }
  };

  return (
    <div className="step-container">
      <div className="progress-indicator">
        <div className="progress-step completed">
          <div className="progress-dot">✓</div>
          <span>Product</span>
        </div>
        <div className="progress-step active">
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

      <h2 className="step-title">Window Measurements</h2>
      <p className="step-subtitle">
        Provide your window dimensions to calculate an estimate
      </p>

      <form onSubmit={handleSubmit} className="measurement-form">
        <div className="form-group">
          <label>Window Width (inches)</label>
          <input
            type="number"
            min="6"
            max="240"
            step="0.5"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            required
          />
          <span className="help-text">Measure left to right</span>
        </div>

        <div className="form-group">
          <label>Window Height (inches)</label>
          <input
            type="number"
            min="6"
            max="240"
            step="0.5"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          <span className="help-text">Measure top to bottom</span>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            max="50"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <span className="help-text">Number of windows</span>
        </div>

        <div className="info-box">
          <strong>Measurement Tips:</strong>
          <ul>
            <li>Measure the window opening from left to right and top to bottom</li>
            <li>Use inches for precise measurements</li>
            <li>
              Final measurements will be confirmed by our installer before
              production
            </li>
            <li>This estimate is for sample pricing purposes</li>
          </ul>
        </div>

        <div className="size-display">
          <strong>Estimated Size Category:</strong>
          <p>{width}″ × {height}″</p>
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next: Select Options
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeasurementStep;
