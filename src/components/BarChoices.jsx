import React from "react";
import DropDownList from "./common/DropDownList";

function BarChoices({ spirits, mixers, liqueurs, others, onSelect }) {
  return (
    <div className="row mb-4">
      <DropDownList title="Spirits" items={spirits} onSelect={onSelect} />
      <DropDownList
        title="Liqueurs and more"
        items={liqueurs}
        onSelect={onSelect}
      />
      <DropDownList title="Mixers" items={mixers} onSelect={onSelect} />
      <DropDownList title="Others" items={others} onSelect={onSelect} />
    </div>
  );
}

export default BarChoices;
