import React from "react";

const LocationSearchPanel = (props) => {
  // console.log(props);
  // sample array for locations
  const locations = [
    "street no. 1, near abc, xyz, 000001",
    "street no. 2, near def, pqr, 000002",
    "street no. 3, near ghi, stu, 000003",
    "street no. 4, near jkl, vwx, 000004",
  ];
  return (
    <div>
      {locations.map(function (element, idx) {
        return (
          <div
            key = {idx}
            onClick={() => {
              props.setVehicleListPanelOpen(true), props.setPanelOpen(false);
            }}
            // the above ensures that when location is selected the location panel gets down and choosing a vehicle opens up.
            className="flex gap-3 border-gray-100 active:border-black border-2 p-2 rounded-xl items-center justify-start my-2"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="font-medium">{element}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
