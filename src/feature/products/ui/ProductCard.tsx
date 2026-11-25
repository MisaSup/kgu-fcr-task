import { ActionIcon, Badge, Button, Card, Group, Image, Menu, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { Product } from "../model/types";
import classes from "./ProductCard.module.css";
import { IconDots, IconTrash } from "@tabler/icons-react";

type ProductCardProps = {
  product: Product;
  removeFromCart: (product: Product) => void;
  addToCart: (product: Product) => void;
  cart: Product[];
};

export function ProductCard({ product, removeFromCart, addToCart, cart }: ProductCardProps) {
  const handleDelete = () => {
    removeFromCart(product);
    notifications.show({
      title: "Удалено",
      message: `Товар «${product.title}» удалён`,
      color: "red",
    });
  };

  const handleAddToCart = () => {
    addToCart(product);
    notifications.show({
      title: "Добавлено в корзину",
      message: product.title,
      color: "teal",
    });
  };

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <Card className={classes.card} padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={product.image} alt={product.title} h={160} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.title}</Text>
        <Badge color="pink" variant="light">
          {product.price} ₽
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {product.description}
      </Text>

      <Group mt="md" justify="space-between">
        <Button
          variant="light"
          color={isInCart ? "teal" : "indigo"}
          className={classes.cartButton}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "В корзине" : "В корзину"}
        </Button>

        <Menu position="bottom-end" withinPortal>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" aria-label="Действия">
              <IconDots size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item color="red" leftSection={<IconTrash size={16} />} onClick={handleDelete}>
              Удалить из корзины
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
}
