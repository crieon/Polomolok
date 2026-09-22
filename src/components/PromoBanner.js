import React from "react";
import "./PromoBanner.css";

const PromoBanner = ({ onGetEstimate, hideButton = false }) => {
  return (
    <div className="promo-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h2>SAVE 15% ON YOUR WINDOW COVERINGS</h2>
          <p>Get your instant estimate today.</p>
        </div>
        {!hideButton && (
          <button className="banner-button" onClick={onGetEstimate}>
            GET MY ESTIMATE
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
