import React from 'react'
import './index.css'
import Navbar from './components/Navbar/navbar.jsx'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Coin from './pages/coin/coin.jsx'



const App = () => {
    return (
        <div className='app'>
      
            <Navbar/>
            
        <div className='app-container'>
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/coin/:coinId' element={<Coin/>}/>
        </Routes>
        
        </div>
        
        </div>
    )
}
    export default App;