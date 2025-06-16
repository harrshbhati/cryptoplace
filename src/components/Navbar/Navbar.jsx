import React, { useContext, useState } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'    
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const currencyMap = {
    usd: { name: "usd", symbol: "$" },
    eur: { name: "eur", symbol: "€" },
    inr: { name: "inr", symbol: "₹" },
  };

  const currencyHandler = (event) => {
    const value = event.target.value.toLowerCase();
    setCurrency(currencyMap[value] || currencyMap["inr"]);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img src={logo} alt="CryptoTracker" className='logo'/>
      </Link>
        
      <ul className={isMenuOpen ? 'active' : ''}>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/market'}><li>Market</li></Link>
        <Link to={'/features'}><li>Features</li></Link>
        <Link to={'/blog'}><li>Blog</li></Link>
      </ul>

      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="sign-in-btn">Sign In</button>
          </SignInButton>
          <Link to="/signup">
            <button className="sign-up-btn">
              Sign Up <img src={arrow_icon} alt="arrow" />
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
      
      <div className="mobile-menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;