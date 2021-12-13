import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dykcunavhhabzpvxndiq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk4NTQ0NCwiZXhwIjoxOTU0NTYxNDQ0fQ.uUaqJLBaY7KIobBqiUpexUxGwe1EkUxpKzaMcKUgV20"
);

export default class Todo {
  constructor() {
    this.items = [];
  }

  async fetchItems() {
    const items = await supabase.from("items");
    this.items = items.data;
    return items.data;
  }

  async addItem({ title, description, priority }) {
    if (typeof title !== "string") {
      throw new Error("Title must be a string!");
    }

    if (typeof priority !== "number" && priority < 0 && priority > 2) {
      throw new Error("Priority must be a number between 0 and 2!");
    }

    const result = await supabase
      .from("items")
      .insert([{ title, description, priority }]);

    return result;
  }

  async checkItem({ id }) {
    const result = await supabase
      .from("items")
      .update({ done: true })
      .eq("id", id);

    return { status: result.status };
  }

  async uncheckItem({ id }) {
    const result = await supabase
      .from("items")
      .update({ done: false })
      .eq("id", id);

    return { status: result.status };
  }

  async deleteItem({ id }) {
    const result = await supabase.from("items").delete().eq("id", id);

    return { status: result.status };
  }

  getItems() {
    return this.items;
  }
}
