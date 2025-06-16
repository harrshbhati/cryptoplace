import React, { createContext, useEffect, useState } from "react";

// ✅ Create the context
export const CoinContext = createContext();

// ✅ Provider component
const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "USD",
        symbol: "$"
    });

    // ✅ Fetch data from API
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-R8Sabn3QBQEorgRJpmNufkEV'
            }
        };

        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await res.json();
            setAllCoin(data); // ✅ Fixed: use the variable 'data', not 'Response'
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]); // ✅ Add dependency so it refetches when currency changes

    const ContextValue = {
        allCoin,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={ContextValue}>
            {props.children} {/* ✅ Fixed: children not childern */}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
