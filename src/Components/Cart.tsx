import { Link } from "react-router-dom";
import ICartMilk from "../Types/ICartMilk";
import IMilk from "../Types/IMilk";
import "../Styles/Cart.css";
import image from "../milk.png";

interface IProps {
  cart: ICartMilk[];
  setCart: React.Dispatch<React.SetStateAction<ICartMilk[]>>;
  filteredMilk: IMilk[];
  setReload: React.Dispatch<React.SetStateAction<string>>;
}

const Cart = ({ cart, setCart, filteredMilk, setReload }: IProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    for (let i = 0; i < cart.length; i++) {
      updateData(cart[i]);
    }

    setCart([]);
    setReload("");
  };

  const updateData = async (item: ICartMilk) => {
    const response = await fetch(`https://localhost:7096/api/Milk/${item.id}`);
    const fetchedMilk = await response.json();

    const updatedStorageAmount = fetchedMilk.storage - item.quantity;
    await fetch(`https://localhost:7096/api/Milk/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        storage: updatedStorageAmount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const handleRemove = (e: React.FormEvent, milk: ICartMilk) => {
    e.preventDefault();
    setCart(cart.filter((item) => item.id !== milk.id));
    const MilkIndex = filteredMilk.findIndex((item) => item.id === milk.id);
    filteredMilk[MilkIndex].storage += milk.quantity;
  };

  return (
    <>
      <div className="cartInfo-container">
        {cart.length > 0 ? (
          <Link
            className="check-out"
            to="/confirmation"
            onClick={(e) => handleSubmit(e)}
          >
            Check out!
          </Link>
        ) : (
          <p className="empty-cart">Cart empty...</p>
        )}
      </div>
      <div className="cartList-container">
        {cart.map((milk) => (
          <div className="cart-item" key={milk.id}>
            <div className="image-container">
              <img src={image} alt="milk" width="100em" height="100em" />
            </div>
            <h3>{milk.name}</h3>
            <h4>{milk.quantity} L</h4>
            <button
              className="remove-button"
              onClick={(e) => handleRemove(e, milk)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
