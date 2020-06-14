import React from "react";
import DropDownList from "./DropDownList";

function BarChoices({ spirits, mixers, others, onSelect }) {
  return (
    <div className="row mb-5">
      <DropDownList title="Spirits" items={spirits} onSelect={onSelect} />
      <DropDownList title="Mixers" items={mixers} onSelect={onSelect} />
      <DropDownList title="Others" items={others} onSelect={onSelect} />
    </div>
  );
}

export default BarChoices;
