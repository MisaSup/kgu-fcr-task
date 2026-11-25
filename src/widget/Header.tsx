import { Cart } from "../feature/cart";
import type { Product } from "../feature/products";
import classes from "./Header.module.css";

type HeaderProps = {
  removeFromCart: (product: Product) => void;
  cart: Product[];
};

export function Header({ cart, removeFromCart }: HeaderProps) {
  return (
    <header className={classes.header}>
      <h2 className={classes.logo}>Marketplace</h2>
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </header>
  );
}
