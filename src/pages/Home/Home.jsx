import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allCoin.length > 0) {
      setIsLoading(false);
      const filtered = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayCoin(filtered);
    }
  }, [allCoin, searchTerm]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Discover & Track <br /> Crypto Assets</h1>
        <p>Real-time cryptocurrency data, powerful tracking tools, and market insights all in one place.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for a cryptocurrency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="Crypto-table">
        <div className="table-header">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p>24h Change</p>
          <p>Market Cap</p>
        </div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading market data...</p>
          </div>
        ) : (
          <div className="table-layout">
            {displayCoin.slice(0, 10).map((item) => (
              <Link to={`/coin/${item.id}`} className="table-row" key={item.id}>
                <p>{item.market_cap_rank}</p>
                <p>
                  <img src={item.image} alt={item.name} />
                  {item.name}
                </p>
                <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                <p style={{ color: item.price_change_percentage_24h >= 0 ? '#4ade80' : '#f87171' }}>
                  {item.price_change_percentage_24h >= 0 ? '+' : ''}{item.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p>{currency.symbol}{item.market_cap.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
