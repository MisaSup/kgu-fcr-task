import { Badge } from "@mantine/core";
import { ProductsList } from "./feature/products";
import classes from "./App.module.css";

function App() {
  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.logo}>Marketplace</h2>
        <Badge size="lg" variant="light">
          Корзина: 0
        </Badge>
      </header>
      <main className={classes.main}>
        <ProductsList />
      </main>
    </>
  );
}

export default App;
