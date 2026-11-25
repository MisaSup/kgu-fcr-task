import { Badge, Menu } from "@mantine/core";
import type { Product } from "../../products";
import CartItem from "./CartItem";

type CartProps = {
  removeFromCart: (product: Product) => void;
  cart: Product[];
};

export function Cart({ cart, removeFromCart }: CartProps) {
  const hasCartItems = Boolean(cart.length);
  return (
    <Menu>
      <Menu.Target>
        <Badge size="lg" variant="light">
          Корзина: {cart.length}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        {!hasCartItems && <Menu.Label>В корзине пока пусто</Menu.Label>}
        {hasCartItems &&
          cart.map((item) => (
            <>
              <Menu.Divider />
              <CartItem key={item.id} product={item} removeFromCart={removeFromCart} />
            </>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
}
