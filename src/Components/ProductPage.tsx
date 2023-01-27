import React, { useState } from "react";
import { Link } from "react-router-dom";
import ICartMilk from "../Types/ICartMilk";
import IMilk from "../Types/IMilk";
import "../Styles/ProductPage.css";
import image from "../milk.png";

interface IProps {
  product: IMilk;
  setCart: React.Dispatch<React.SetStateAction<ICartMilk[]>>;
  cart: ICartMilk[];
  filteredMilk: IMilk[];
}

const ProductPage = ({ product, setCart, cart, filteredMilk }: IProps) => {
  const [input, setInput] = useState("0");

  const milk: ICartMilk = {
    id: product.id,
    name: product.name,
    quantity: parseInt(input),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cartMilkIndex = cart.findIndex((item) => item.id === milk.id);
    const MilkIndex = filteredMilk.findIndex((item) => item.id === milk.id);
    filteredMilk[MilkIndex].storage -= milk.quantity;

    if (cartMilkIndex !== -1) {
      cart[cartMilkIndex].quantity += milk.quantity;
      setCart([...cart]);
    } else {
      setCart([...cart, milk]);
    }
  };

  return (
    <div className="product-container">
      <div>
        <Link className="back-button" to="/">
          {"< Back"}
        </Link>
        <br></br>
        <div className="image">
          <img src={image} alt="milk" width="sem" height="100em" />
        </div>
      </div>
      <div>
        <h3>{product.name}</h3>
        <p style={{ color: "gray" }}>{product.type}</p>
        <p style={{ color: "#a99005" }}>
          {product.storage === 0 ? "Sold out!" : product.storage + " L"}
        </p>
        <div className="slidecontainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="range"
              min="1"
              max={product.storage}
              className="slider"
              id="myRange"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <output>{input}</output>
            <button className="cart-button">Add to Cart!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
