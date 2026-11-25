import { ActionIcon, Badge, Button, Card, Group, Image, Menu, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import type { Product } from "../model/types";
import classes from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const handleEdit = () => {
    notifications.show({
      title: "Редактирование",
      message: `Редактируем «${product.title}»`,
      color: "blue",
    });
  };

  const handleDelete = () => {
    notifications.show({
      title: "Удалено",
      message: `Товар «${product.title}» удалён`,
      color: "red",
    });
  };

  const handleAddToCart = () => {
    notifications.show({
      title: "Добавлено в корзину",
      message: product.title,
      color: "teal",
    });
  };

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
        <Button variant="light" onClick={handleAddToCart}>
          В корзину
        </Button>

        <Menu position="bottom-end" withinPortal>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" aria-label="Действия">
              <IconDots size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconPencil size={16} />} onClick={handleEdit}>
              Редактировать
            </Menu.Item>
            <Menu.Item color="red" leftSection={<IconTrash size={16} />} onClick={handleDelete}>
              Удалить
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
}
