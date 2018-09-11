import React from "react";
import "../cart/SumCounter.css";

const SumCounter = ({ sum, currencySign }) => (
  <div className="sum-counter">
    Total cost: {sum} {currencySign}
  </div>
);

export default SumCounter;
