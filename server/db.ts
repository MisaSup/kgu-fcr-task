import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dbPath = fileURLToPath(new URL("./data/db.json", import.meta.url));

export type Product = {
  id: string;
  title: string;
  price: number;
  description?: string;
  image?: string;
};

export type Db = {
  products: Product[];
};

export async function readDb(): Promise<Db> {
  const raw = await readFile(dbPath, "utf8");
  return JSON.parse(raw) as Db;
}

export async function writeDb(db: Db): Promise<void> {
  await writeFile(dbPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}
