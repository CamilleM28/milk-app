import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IMilk from "./Types/IMilk";
import ICartMilk from "./Types/ICartMilk";
import Header from "./Components/Header";
import MilkList from "./Components/MilkList";
import ProductPage from "./Components/ProductPage";
import "./App.css";
import Cart from "./Components/Cart";
import Confirmation from "./Components/Confirmation";

const App = () => {
  const [milk, setMilk] = useState<IMilk[]>([]);
  const [filteredMilk, setFilteredMilk] = useState<IMilk[]>([]);
  const [product, setProduct] = useState<IMilk>({
    id: "",
    name: "",
    type: "",
    storage: 0,
  });
  const [type, setType] = useState<string[]>([]);
  const [cart, setCart] = useState<ICartMilk[]>([]);
  const [reload, setReload] = useState<string>("");

  useEffect(() => {
    const getMilk = async () => {
      const response = await fetch("https://localhost:7096/api/Milk");
      const Milk = await response.json();

      setMilk(Milk);
      setFilteredMilk(Milk);
    };

    getMilk();
  }, [reload]);

  useEffect(() => {
    const filterMilk = () => {
      if (type.length === 0) {
        setFilteredMilk(milk);
      } else {
        const milkType = milk.filter((milk) =>
          type.includes(milk.type.split(" ")[0])
        );
        setFilteredMilk(milkType);
      }
    };

    filterMilk();
  }, [type, milk]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header cart={cart} setType={setType} />
              <MilkList
                filteredMilk={filteredMilk}
                setType={setType}
                setProduct={setProduct}
              />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Header cart={cart} setType={setType} />
              <ProductPage
                product={product}
                setCart={setCart}
                cart={cart}
                filteredMilk={filteredMilk}
              />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header cart={cart} setType={setType} />
              <Cart
                cart={cart}
                setCart={setCart}
                filteredMilk={filteredMilk}
                setReload={setReload}
              />
            </>
          }
        />
        <Route
          path="/confirmation"
          element={
            <>
              <Header cart={cart} setType={setType} />
              <Confirmation />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
