import { Link } from "react-router-dom";
import "../Styles/Header.css";
import ICartMilk from "../Types/ICartMilk";

interface IProps {
  cart: ICartMilk[];
  setType: React.Dispatch<React.SetStateAction<string[]>>;
}

const Header = ({ cart, setType }: IProps) => {
  return (
    <div className="Header">
      <h1 className="Heading">The Milk Store</h1>
      <div className="Links">
        <Link className="Link" to="/" onClick={() => setType([])}>
          Home
        </Link>
        <Link className="Link" to="/cart">
          Cart ({cart.length})
        </Link>
      </div>
    </div>
  );
};

export default Header;
