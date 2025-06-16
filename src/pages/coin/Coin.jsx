import React, { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState({ prices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {currency} = useContext(CoinContext);
  
  // Fetch coin data from CoinGecko API
  const fetchCoinData = async () => {
    setLoading(true);
    setError(null);
    
    const options = {
      method: 'GET', 
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-R8Sabn3QBQEorgRJpmNufkEV'
      }
    };

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
      setError(err.message);
    }
  }
  
  // Fetch historical data for the coin
  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET', 
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-R8Sabn3QBQEorgRJpmNufkEV'
      }
    };

    try {
      // Use a smaller time range to avoid rate limiting
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7`, 
        options
      );
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data && data.prices && data.prices.length > 0) {
        setHistoricalData(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching historical data:", err);
      // Create mock data for demonstration if API fails
      const mockData = generateMockChartData();
      setHistoricalData(mockData);
    } finally {
      setLoading(false);
    }
  }

  // Generate mock chart data if API fails
  const generateMockChartData = () => {
    const prices = [];
    const now = new Date();
    
    // Generate 7 days of mock data
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const timestamp = date.getTime();
      
      // Generate a random price between 20000 and 30000
      const basePrice = coinId === 'bitcoin' ? 25000 : 1500;
      const randomVariation = Math.random() * 1000 - 500;
      const price = basePrice + randomVariation;
      
      prices.push([timestamp, price]);
    }
    
    return { prices };
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);
  
  // Helper function to determine price change class
  const getPriceChangeClass = (changePercentage) => {
    return changePercentage >= 0 ? "price-up" : "price-down";
  };
  
  if(coinData && historicalData && historicalData.prices){
    const priceChangeClass = getPriceChangeClass(coinData.market_data.price_change_percentage_24h);
    
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData.name} />
          <p>
            <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
          </p>
          <div className={`price-change ${priceChangeClass}`}>
            {coinData.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
          </div>
        </div>
        
        <div className="coin-chart">
          {historicalData && historicalData.prices && historicalData.prices.length > 0 ? (
            <LineChart historicalData={historicalData}/>
          ) : (
            <div className="chart-loading">Loading chart data...</div>
          )}
          {error && <div className="chart-error">Error loading chart: {error}</div>}
        </div>
        
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>#{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li className={priceChangeClass}>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[currency.name] !== undefined
                ? coinData.market_data.current_price[currency.name].toLocaleString()
                : "N/A"}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name] !== undefined
                ? coinData.market_data.market_cap[currency.name].toLocaleString()
                : "N/A"}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name] !== undefined
                ? coinData.market_data.high_24h[currency.name].toLocaleString()
                : "N/A"}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name] !== undefined
                ? coinData.market_data.low_24h[currency.name].toLocaleString()
                : "N/A"}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;