const express = require("express");
const fs = require("fs").promises;
const app = express();
app.use(express.json());
let todos = [];
const readTodoFile = async function () {
  try {
    const data = await fs.readFile("./todo.json", "utf8");
    todos = JSON.parse(data);
  } catch (e) {
    console.log("error in readTodoFromFile" + e);
  }
};
const writeTodoFile = async function () {
  try {
    await fs.writeFile("./todo.json", JSON.stringify(todos), "utf-8");
  } catch (e) {
    console.log("error in writeTodoFile" + e);
  }
};
readTodoFile();
app.get("/todos", (req, res) => {
  res.end(JSON.stringify(todos));
});
app.post("/todo", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "text must be" });
  }
  const todoIp = {
    id: todos.length + 1,
    text,
  };
  todos.push(todoIp);
  res.statusCode = 200;
  writeTodoFile();
});
app.delete("/todo:id", function (req, res) {
  const todoId = req.params.id;
  todos = todos.filter((item) => item.id != todoId);
  writeTodoFile();
  res.end("item has been deleted successfully");
});
app.get("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  console.log(req.params.id);
  const resTodo = todos.filter((item) => item.id == todoId);

  res.json({ data: resTodo });
});
app.listen(8080, () => {
  console.log("listening on");
});
