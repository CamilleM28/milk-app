import React, { useState } from "react";
import IMilk from "../Types/IMilk";
import MilkProduct from "./MilkProduct";
import "../Styles/MilkList.css";
import Dropdown from "./Dropdown";

interface IProps {
  filteredMilk: IMilk[];
  setType: React.Dispatch<React.SetStateAction<string[]>>;
  setProduct: React.Dispatch<React.SetStateAction<IMilk>>;
}

const MilkList = ({ filteredMilk, setType, setProduct }: IProps) => {
  const types = [
    "Cashew",
    "Pea",
    "Walnut",
    "Rice",
    "Coconut",
    "Soy",
    "Hemp",
    "Almond",
    "Oat",
    "Whole",
    "Macadamia",
  ];

  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };

  const searchedMilk = filteredMilk.filter((milk) =>
    milk.name.toLowerCase().includes(query)
  );

  return (
    <>
      <div className="Filtering">
        <input
          className="search"
          type="search"
          placeholder="Search..."
          onChange={handleChange}
        />
        <div className="filter">
          <button className="open-dropdown" onClick={() => setShow(!show)}>
            Filter <small>{show ? "\u1431" : "\u142F"}</small>
          </button>
          <div
            className="dropdown-content"
            style={show === false ? { display: "none" } : { display: "block" }}
          >
            <strong className="milk-types">Milk Types</strong>
            {types.map((milkType) => (
              <Dropdown
                key={types.indexOf(milkType)}
                milkType={milkType}
                setType={setType}
                types={types}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="total-products">
        {query === ""
          ? filteredMilk.length + " products"
          : searchedMilk.length + " products"}{" "}
      </p>
      <div className="list">
        {searchedMilk.map((milk) => (
          <MilkProduct key={milk.id} milk={milk} setProduct={setProduct} />
        ))}
      </div>
    </>
  );
};

export default MilkList;
