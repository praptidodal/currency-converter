import React, { useState, useMemo } from "react";

// 1. Hardcoded exchange rates (USD is the base currency)
const rates = {
  USD: 1.0,
  INR: 95.73,
  EUR: 0.8648,
  GBP: 0.7333,
  JPY: 158.651
};

// 2. Supported currencies for select options
const currencies = [
  { code: "USD", name: "USD ($)" },
  { code: "INR", name: "INR (₹)" },
  { code: "EUR", name: "EUR (€)" },
  { code: "GBP", name: "GBP (£)" },
  { code: "JPY", name: "JPY (¥)" }
];

// 3. Mapping of currency codes to symbols for badge labels
const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥"
};

// MAIN COMPONENT containing all converter logic
export function CurrencyConverter() {
  // Simple React states for inputs and selectors
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");

  // Step 1: Memoized base conversion from entered amount to USD.
  // Recalculates ONLY when amount or fromCurrency changes.
  const baseAmount = useMemo(() => {
    console.log("Conversion recalculated");
    const numericAmount = parseFloat(amount) || 0;
    return numericAmount / rates[fromCurrency];
  }, [amount, fromCurrency]);

  // Step 2: Conversion from USD to target currency.
  // Reuses the memoized base amount to calculate target currency on render.
  const targetAmount = baseAmount * rates[toCurrency];

  // Swaps selected source and target currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Calculates the current exchange rate for display
  const exchangeRateVal = rates[toCurrency] / rates[fromCurrency];

  return (
    <div className="converter-card">
      {/* Mascot Section */}
      <div className="mascot-area">
        <div className="header-mascot-container">
          <img 
            src="/mascot.jpg" 
            alt="Piggy holding Rupee and Dollar bags" 
            className="mascot-img"
          />
          <span className="mascot-heart">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
        </div>
        <div className="mascot-shadow"></div>
      </div>

      {/* Card Header Title */}
      <h1 className="converter-title">Currency Converter</h1>

      {/* Amount Input */}
      <div className="input-group">
        <label htmlFor="amount-input" className="section-label">Amount</label>
        <div className="amount-input-wrapper">
          <span className={`input-symbol-badge currency-badge-${fromCurrency}`}>
            {currencySymbols[fromCurrency]}
          </span>
          <input
            id="amount-input"
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="amount-field"
          />
        </div>
      </div>

      {/* Currency Select Dropdowns */}
      <div className="selectors-row">
        <div className="select-container">
          <label htmlFor="from-select" className="section-label">From</label>
          <div className="custom-select-wrapper">
            <span className={`select-symbol-badge currency-badge-${fromCurrency}`}>
              {currencySymbols[fromCurrency]}
            </span>
            <select
              id="from-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="currency-select"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="swap-button-wrapper">
          <div className="swap-lines-decor">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <button 
            onClick={handleSwap} 
            className="swap-button" 
            title="Swap Currencies"
            type="button"
          >
            ⇆
          </button>
        </div>

        <div className="select-container">
          <label htmlFor="to-select" className="section-label">To</label>
          <div className="custom-select-wrapper">
            <span className={`select-symbol-badge currency-badge-${toCurrency}`}>
              {currencySymbols[toCurrency]}
            </span>
            <select
              id="to-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="currency-select"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Converted Amount Result Display */}
      <div className="result-section">
        <span className="result-label">Converted Amount</span>
        <div className="result-value">
          {targetAmount.toFixed(2)} {toCurrency}
        </div>
        <div className="rate-info-pill">
          1 {fromCurrency} = {exchangeRateVal.toFixed(4)} {toCurrency} <span className="info-icon-badge">i</span>
        </div>
      </div>
    </div>
  );
}

// App Shell Wrapper
export default function App() {
  return (
    <div className="page-wrapper">
      {/* Floating background elements */}
      <div className="floating-decorations">
        {/* Left Side Sparkles */}
        <div className="decor sparkle-star dec-4">✦</div>
        
        {/* Right Side Sparkles */}
        <div className="decor sparkle-star dec-8">✦</div>
        
        {/* Random background highlights */}
        <div className="decor sparkle-star dec-9">✦</div>
        <div className="decor dot dec-10"></div>
        <div className="decor dot dec-11"></div>
        <div className="decor sparkle-star dec-12">✦</div>
      </div>

      {/* Main card */}
      <CurrencyConverter />
    </div>
  );
}
