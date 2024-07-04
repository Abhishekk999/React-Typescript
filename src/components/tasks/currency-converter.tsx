import React, { useState, useEffect } from "react";
import "./tasks.css";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

type TExchangeRates = {
  [key: string]: number;
};

function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(amount);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const rates: TExchangeRates = data.rates;
        setExchangeRate(rates[toCurrency]);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [toCurrency]);

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const currencyOptions: string[] = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "KRW",
    "SGD",
    "HKD",
    "NOK",
    "MXN",
    "INR",
    "RUB",
    "BRL",
    "ZAR",
    "TRY",
  ];

  return (
    <div className="cards">
      <div className="container">
        <h2>Currency converter</h2>
        <br />
        <input
          className="currency-input"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <div className="selected-country">
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span>to</span>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <h2 className="amount">
          Converted Amount: {convertedAmount.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default CurrencyConverter;
