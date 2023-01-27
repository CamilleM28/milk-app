import { Link } from "react-router-dom";
import IMilk from "../Types/IMilk";
import "../Styles/MilkProduct.css";
import image from "../milk.png";

interface IProps {
  milk: IMilk;
  setProduct: React.Dispatch<React.SetStateAction<IMilk>>;
}

const MilkProduct = ({ milk, setProduct }: IProps) => {
  return (
    <Link className="product" to="/product" onClick={() => setProduct(milk)}>
      <div>
        <div className="image-container">
          <img src={image} alt="milk" width="100em" height="100em" />
        </div>
        <h3 className="milk-name">{milk.name}</h3>
        <div className="milk-info">
          <h4>{milk.type}</h4>
          <h5 style={{ color: "#99db89" }}>
            {milk.storage === 0 ? "Sold out!" : milk.storage + " L"}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default MilkProduct;
