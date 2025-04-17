import React from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";

const InfoCard = ({ name, symbol, price, change, gainer }) => {
    return (
        <div
            className="card w-100 shadow-sm rounded h-50"
            style={{ backgroundColor: gainer ? "#d4edda" : "#f8d7da" }}
        >
            <div className="card-body d-flex flex-column gap-3">
                <div>
                    <h6 className="text-primary mb-1">{name}</h6>
                </div>
                <div>
                    <h6 className="text-muted mb-1">{symbol}</h6>
                </div>
                <div>
                    <h6 className="text-muted mb-1">{price}</h6>
                </div>
                <div className="d-flex align-items-center gap-2">
                    {gainer ? (
                        <FaAngleDoubleUp className="text-success" />
                    ) : (
                        <FaAngleDoubleDown className="text-danger" />
                    )}
                    <h6 className="mb-1" style={{ color: gainer ? "green" : "red" }}>
                        {change}
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
