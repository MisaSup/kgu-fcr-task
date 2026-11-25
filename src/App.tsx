import { ProductsList, type Product } from "./feature/products";
import { Header } from "./widget";
import classes from "./App.module.css";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={(product) => setCart(cart.filter((item) => item.id !== product.id))}
      />
      <main className={classes.main}>
        <ProductsList
          cart={cart}
          addToCart={(product) => setCart([...cart, product])}
          removeFromCart={(product) => setCart(cart.filter((item) => item.id !== product.id))}
        />
      </main>
    </>
  );
}

export default App;
