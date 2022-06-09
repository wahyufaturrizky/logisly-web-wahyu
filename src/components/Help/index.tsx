import React from "react";
import "./index.css";
import image from "../../assets/icons/clarity_help-line.svg";

const Help = ({ titleText }: { titleText: string }) => {
  return (
    <div className="help">
      <img alt={image} src={image} className="help-img" />
      <span className="tooltiptext">{titleText}</span>
    </div>
  );
};

export default Help;
