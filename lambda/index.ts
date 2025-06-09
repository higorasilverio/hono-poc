import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { getDb } from "./db";
import { items } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

// POST /items
app.post("/items", async (c) => {
  try {
    const body = await c.req.json();
    const { name, value, description, quantity } = body;
    if (!name || !value) {
      return c.json(
        { success: false, message: "Missing item mandatory info: name/value" },
        400
      );
    }
    const db = await getDb();
    const result = await db
      .insert(items)
      .values({ name, value, description, quantity });
    return c.json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "Failed to create item" }, 500);
  }
});

// GET /items
app.get("/items", async (c) => {
  try {
    const db = await getDb();
    const result = await db.select().from(items);
    return c.json(result);
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "Failed to fetch items" }, 500);
  }
});

// PUT /items/:id
app.put("/items/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, message: "Invalid item ID" }, 400);
    }

    const body = await c.req.json();
    const { name, value, description, quantity } = body;

    const db = await getDb();
    const result = await db
      .update(items)
      .set({ name, value, description, quantity })
      .where(eq(items.id, id));
    return c.json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "Failed to update item" }, 500);
  }
});

// DELETE /items/:id
app.delete("/items/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ success: false, message: "Invalid item ID" }, 400);
    }

    const db = await getDb();
    const result = await db.delete(items).where(eq(items.id, id));
    return c.json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "Failed to delete item" }, 500);
  }
});

export const handler = handle(app);
