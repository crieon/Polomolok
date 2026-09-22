import React, { useState } from "react";
import config, { formatCurrency } from "../config/pricing";
import "./OptionsStep.css";

const OptionsStep = ({
  onSubmit,
  onBack,
  currentOptions = {
    operation: "standard",
    mounting: "inside",
    lightControl: "light-filtering",
    upgrades: [],
    installation: "professional",
  },
}) => {
  const [operation, setOperation] = useState(currentOptions.operation);
  const [mounting, setMounting] = useState(currentOptions.mounting);
  const [lightControl, setLightControl] = useState(currentOptions.lightControl);
  const [upgrades, setUpgrades] = useState(currentOptions.upgrades || []);
  const [installation, setInstallation] = useState(
    currentOptions.installation
  );

  const handleUpgradeToggle = (upgradeId) => {
    setUpgrades((prev) =>
      prev.includes(upgradeId)
        ? prev.filter((id) => id !== upgradeId)
        : [...prev, upgradeId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      operation,
      mounting,
      lightControl,
      upgrades,
      installation,
    });
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
        <div className="progress-step active">
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

      <h2 className="step-title">Customize Your Blinds</h2>
      <p className="step-subtitle">Select options that fit your needs</p>

      <form onSubmit={handleSubmit} className="options-form">
        {/* Operation */}
        <div className="form-group">
          <label className="section-label">
            {config.blindOptions.operation.label}
          </label>
          <div className="radio-group">
            {config.blindOptions.operation.options.map((option) => (
              <label key={option.id} className="radio-option">
                <input
                  type="radio"
                  name="operation"
                  value={option.id}
                  checked={operation === option.id}
                  onChange={() => setOperation(option.id)}
                />
                <span>
                  {option.label}
                  {option.price > 0 && (
                    <span className="price-tag">
                      +${option.price.toFixed(2)}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Mounting */}
        <div className="form-group">
          <label className="section-label">
            {config.blindOptions.mounting.label}
          </label>
          <div className="radio-group">
            {config.blindOptions.mounting.options.map((option) => (
              <label key={option.id} className="radio-option">
                <input
                  type="radio"
                  name="mounting"
                  value={option.id}
                  checked={mounting === option.id}
                  onChange={() => setMounting(option.id)}
                />
                <span>
                  {option.label}
                  {option.price > 0 && (
                    <span className="price-tag">
                      +${option.price.toFixed(2)}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Light Control */}
        <div className="form-group">
          <label className="section-label">
            {config.blindOptions.lightControl.label}
          </label>
          <div className="radio-group">
            {config.blindOptions.lightControl.options.map((option) => (
              <label key={option.id} className="radio-option">
                <input
                  type="radio"
                  name="lightControl"
                  value={option.id}
                  checked={lightControl === option.id}
                  onChange={() => setLightControl(option.id)}
                />
                <span>
                  {option.label}
                  {option.price > 0 && (
                    <span className="price-tag">
                      +${option.price.toFixed(2)}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Upgrades */}
        <div className="form-group">
          <label className="section-label">Optional Upgrades</label>
          <div className="upgrades-list">
            {config.blindOptions.upgrades.map((upgrade) => (
              <label key={upgrade.id} className="checkbox-group">
                <input
                  type="checkbox"
                  checked={upgrades.includes(upgrade.id)}
                  onChange={() => handleUpgradeToggle(upgrade.id)}
                />
                <span>
                  {upgrade.label}
                  <span className="price-tag">+${upgrade.price.toFixed(2)}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Installation */}
        <div className="form-group">
          <label className="section-label">Installation</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="installation"
                value="customer"
                checked={installation === "customer"}
                onChange={() => setInstallation("customer")}
              />
              <span>Customer Installation</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="installation"
                value="professional"
                checked={installation === "professional"}
                onChange={() => setInstallation("professional")}
              />
              <span>Professional Installation</span>
            </label>
          </div>
        </div>

        <div className="info-box">
          <strong>Installation Information:</strong>
          <p>
            Professional installation includes measurement confirmation and
            professional setup. First window: $125, each additional window: $50
          </p>
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next: Review Estimate
          </button>
        </div>
      </form>
    </div>
  );
};

export default OptionsStep;
