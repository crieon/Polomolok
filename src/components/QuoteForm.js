import React, { useState } from "react";
import config from "../config/pricing";
import "./QuoteForm.css";

const QuoteForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerCity: "",
    customerPostal: "",
    contactMethod: "email",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email address";
    }
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone is required";
    }
    if (!formData.customerCity.trim()) {
      newErrors.customerCity = "City is required";
    }
    if (!formData.customerPostal.trim()) {
      newErrors.customerPostal = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
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
        <div className="progress-step completed">
          <div className="progress-dot">✓</div>
          <span>Estimate</span>
        </div>
        <div className="progress-step active">
          <div className="progress-dot">5</div>
          <span>Quote</span>
        </div>
      </div>

      <h2 className="step-title">Request Your Quote</h2>
      <p className="step-subtitle">
        Provide your contact information and we'll send you a final quote
      </p>

      <form onSubmit={handleSubmit} className="quote-form">
        <div className="form-section">
          <h3>Contact Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={errors.customerName ? "error" : ""}
              />
              {errors.customerName && (
                <span className="error-message">{errors.customerName}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={errors.customerEmail ? "error" : ""}
              />
              {errors.customerEmail && (
                <span className="error-message">{errors.customerEmail}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className={errors.customerPhone ? "error" : ""}
              />
              {errors.customerPhone && (
                <span className="error-message">{errors.customerPhone}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Location</h3>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <select
                name="customerCity"
                value={formData.customerCity}
                onChange={handleChange}
                className={errors.customerCity ? "error" : ""}
              >
                <option value="">Select your city</option>
                {config.locations.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.customerCity && (
                <span className="error-message">{errors.customerCity}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Postal Code *</label>
              <input
                type="text"
                name="customerPostal"
                value={formData.customerPostal}
                onChange={handleChange}
                className={errors.customerPostal ? "error" : ""}
              />
              {errors.customerPostal && (
                <span className="error-message">{errors.customerPostal}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Preferences</h3>

          <div className="form-group">
            <label>Preferred Contact Method *</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === "email"}
                  onChange={handleChange}
                />
                <span>Email</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === "phone"}
                  onChange={handleChange}
                />
                <span>Phone</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="contactMethod"
                  value="sms"
                  checked={formData.contactMethod === "sms"}
                  onChange={handleChange}
                />
                <span>SMS</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Project Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us about your project (e.g., special requirements, additional windows, etc.)"
            />
          </div>
        </div>

        <div className="info-box">
          <strong>Next Steps:</strong>
          <p>
            After you submit this form, our team will review your estimate and
            contact you with a final quote and to schedule a measurement
            appointment.
          </p>
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary btn-large">
            REQUEST MY QUOTE
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
