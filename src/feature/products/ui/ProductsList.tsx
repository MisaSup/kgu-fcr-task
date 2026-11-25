import { products } from "../model/products";
import { ProductCard } from "./ProductCard";
import classes from "./ProductsList.module.css";

export function ProductsList() {
  return (
    <ul className={classes.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
