import React from "react";
import spinnerImg from "../../../src/assests/img/Infinity-1s-200px-loading-gif.gif";

let Spinner = () => {
  return (
    <React.Fragment>
      <img src={spinnerImg} className="d-block m-auto" />
    </React.Fragment>
  );
};

export default Spinner;
