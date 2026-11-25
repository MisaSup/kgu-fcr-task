import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { readDb, writeDb, type Product } from "./db.ts";

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors());
app.use("/images/*", serveStatic({ root: "./server/public" }));

app.get("/", (c) => c.text("Marketplace API"));

const products = new Hono();

products.get("/", async (c) => {
  const db = await readDb();
  return c.json(db.products);
});

products.get("/:id", async (c) => {
  const db = await readDb();
  const product = db.products.find((item) => item.id === c.req.param("id"));

  if (!product) {
    return c.json({ message: "Product not found" }, 404);
  }

  return c.json(product);
});

products.post("/", async (c) => {
  const body = await c.req.json<Partial<Product>>();
  const db = await readDb();

  const product: Product = {
    id: crypto.randomUUID(),
    title: body.title ?? "Untitled",
    price: body.price ?? 0,
    description: body.description,
    image: body.image,
  };

  db.products.push(product);
  await writeDb(db);

  return c.json(product, 201);
});

products.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<Partial<Product>>();
  const db = await readDb();

  const index = db.products.findIndex((item) => item.id === id);

  if (index === -1) {
    return c.json({ message: "Product not found" }, 404);
  }

  const updated: Product = { ...db.products[index], ...body, id };
  db.products[index] = updated;
  await writeDb(db);

  return c.json(updated);
});

products.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const db = await readDb();

  const index = db.products.findIndex((item) => item.id === id);

  if (index === -1) {
    return c.json({ message: "Product not found" }, 404);
  }

  const [removed] = db.products.splice(index, 1);
  await writeDb(db);

  return c.json(removed);
});

app.route("/api/products", products);

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API server: http://localhost:${info.port}`);
});
