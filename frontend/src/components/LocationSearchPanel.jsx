import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };
  return (
    <div>
      {suggestions.map((element, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              handleSuggestionClick(element.description);
            }}
            // the above ensures that when location is selected the location panel gets down and choosing a vehicle opens up.
            className="flex gap-3 border-gray-100 active:border-black border-2 p-2 rounded-xl items-center justify-start my-2"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="font-medium">{element.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
