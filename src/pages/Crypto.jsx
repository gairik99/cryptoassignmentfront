import React, { useRef, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import PriceChart from "../components/PriceChart";
import VolumeChart from "../components/VolumeChart";
import MobileNavBar from "../components/MobileNavBar";
import { getPrice } from "../service/action";

const Crypto = () => {
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const [price, setPrice] = useState({
        price: [],
        volume: [],
    });
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchCryptoData = async () => {
        const coinId = selectRef.current?.value || "bitcoin";
        const days = inputRef.current?.value || "1";
        try {
            const data = await getPrice({ coinId, days });
            // console.log("Fetched data:", data);
            setPrice((value) => ({
                ...value,
                price: data?.prices,
                volume: data?.total_volumes,
            }));
        } catch (error) {
            console.error("Error fetching crypto data:", error);
        }
    };
    // console.log("price", price);

    const handleChange = () => {
        fetchCryptoData();
    };
    useEffect(() => {
        fetchCryptoData(); // initial fetch
        const interval = setInterval(fetchCryptoData, 4000); // every 40 seconds
        return () => clearInterval(interval); // cleanup on unmount
    }, []);
    return (
        <div className="d-flex  bg-light">
            {!isHidden && <SideBar />}
            <div className="flex-grow-1 p-3 flex-column gap-3">
                <div className="d-flex justify-content-end align-items-center gap-2">
                    <input
                        type="number"
                        placeholder="Enter days"
                        ref={inputRef}
                        onChange={handleChange}
                        defaultValue="1"
                        min={1}
                        max={45}
                        className="form-control w-auto"
                    />
                    <select
                        name="crypto"
                        ref={selectRef}
                        onChange={handleChange}
                        defaultValue="bitcoin"
                        className="form-select w-auto"
                    >
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="litecoin">Litecoin</option>
                        <option value="ripple">Ripple</option>
                        <option value="dogecoin">Dogecoin</option>
                        <option value="cardano">Cardano</option>
                        <option value="solana">Solana</option>
                        <option value="polkadot">Polkadot</option>
                        <option value="tron">TRON</option>
                    </select>
                </div>
                <div className="d-flex flex-column gap-5">
                    <PriceChart
                        price={price.price}
                        days={inputRef.current?.value || "1"}
                    />
                    <VolumeChart
                        volume={price.volume}
                        days={inputRef.current?.value || "1"}
                    />
                </div>
            </div>
            {isHidden && <MobileNavBar />}
        </div>
    );
};

export default Crypto;
