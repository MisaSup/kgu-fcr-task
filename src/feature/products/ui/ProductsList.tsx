import { useEffect, useState } from "react";
import { productsSchema, type Product } from "../model/types";
import { ProductCard } from "./ProductCard";
import classes from "./ProductsList.module.css";

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch("/api/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Не удалось загрузить товары: ${response.status}`);
        }

        const result = productsSchema.safeParse(await response.json());

        if (!result.success) {
          throw new Error("Получены некорректные данные о товарах");
        }

        setProducts(result.data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <p>Загрузка…</p>;
  }

  return (
    <>
      {error && <p role="alert">{error}</p>}

      <ul className={classes.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
