import { useEffect, useState } from "react";
import React from "react";
import SideBar from "../components/SideBar";
import MobileNavBar from "../components/MobileNavBar";
import { getTopGainer, getTopLoser } from "../service/action";
import InfoCard from "../components/InfoCard";

const GainerLoser = () => {
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const [gainloser, setGainerLoser] = useState({
        gainers: [],
        losers: [],
    });
    const parameter = {
        page: 1,
        vs_currency: "usd",
        per_page: 1,
    };

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchtopGainerLoser = async () => {
            try {
                const data1 = await getTopGainer(parameter);
                const data2 = await getTopLoser(parameter);
                setGainerLoser((value) => ({
                    ...value,
                    gainers: data1,
                    losers: data2,
                }));
                // console.log("Top Gainers:", data1);
                // console.log("Top Losers:", data2);
            } catch (error) {
                console.error("Error fetching top gainers:", error);
            }
        };

        fetchtopGainerLoser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log("gainloser", gainloser.gainers[0]?.name);
    return (
        <div className="d-flex">
            {!isHidden && <SideBar />}
            <div className={`d-flex gap-3 p-3 flex-grow-1 ${isHidden ? "flex-column" : "flex-row"}`}>
                <InfoCard
                    name={gainloser.gainers[0]?.name}
                    symbol={gainloser.gainers[0]?.symbol}
                    price={gainloser.gainers[0]?.current_price}
                    change={gainloser.gainers[0]?.price_change_percentage_24h}
                    gainer={true}
                />
                <InfoCard
                    name={gainloser.losers[0]?.name}
                    symbol={gainloser.losers[0]?.symbol}
                    price={gainloser.losers[0]?.current_price}
                    change={gainloser.losers[0]?.price_change_percentage_24h}
                    gainer={false}
                />
            </div>
            {isHidden && <MobileNavBar />}
        </div>
    );
};

export default GainerLoser;
