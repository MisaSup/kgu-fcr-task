import { ActionIcon, Image, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";
import type { Product } from "../../products";
import classes from "./CartItem.module.css";

interface Props {
  removeFromCart: (product: Product) => void;
  product: Product;
}

const CartItem: React.FC<Props> = ({ product, removeFromCart }) => {
  return (
    <div className={classes.item}>
      <Image src={product.image} alt={product.title} h={40} w={40} fit="contain" />
      <Text size="md" className={classes.title}>
        {product.title}
      </Text>
      <ActionIcon
        variant="subtle"
        color="gray"
        aria-label={`Удалить ${product.title} из корзины`}
        onClick={() => removeFromCart(product)}
      >
        <IconX size={16} />
      </ActionIcon>
    </div>
  );
};

export default CartItem;
