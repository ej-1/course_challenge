import React from "react";
import "../cart/sum-counter.css";

const Sum = ({ sum, currencySign }) => (
  <div className="sum-counter">
    Total cost: {sum} {currencySign}
  </div>
);

export default Sum;
