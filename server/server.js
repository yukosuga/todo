const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("node:fs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 4000;

const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://todo-mini-app.onrender.com/",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hey I am running before everything");
  next();
});

app.get("/", (req, res) => {
  res.json({message: "Todo Server is working"});
});

app.use((req, res, next) => {
  console.log("Do i run?");

  const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

  req.todos = todos;
  next();
});

app.use("/todos/:id", (req, res, next) => {
  console.log("I am a middle for path /todo/:id");
  console.log(req.params.id);

  if (!parseFloat(req.params.id)) {
    res.status(500).json({
      error: {
        message: "id is not a number",
      },
    });
  }

  req.id = parseFloat(req.params.id);
  next();
});

app.get("/todos", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));
  console.log("todos:", todos);
  res.json({message: "Get all todos", todos});
});

app.post("/todos", (req, res) => {
  try {
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

    const todo = {
      text: req.body.text,
      isDone: false,
      id: Math.random(),
    };

    todos.push(todo);

    fs.writeFileSync("todos.json", JSON.stringify(todos));

    res.json({message: "todo was added", todo});
  } catch (err) {
    res.json({
      error: {
        message: err.message,
      },
    });
  }
});

app.delete("/todos/:id", (req, res) => {
  try {
    if (!parseFloat(req.params.id)) {
      throw new Error("id is not a number");
    }
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

    const updatedTodosArray = todos.filter(
      (todo) => todo.id !== Number(req.params.id)
    );

    if (updatedTodosArray.length === todos.length) {
      throw new Error("id is not in the todos array");
    }

    fs.writeFileSync("todos.json", JSON.stringify(updatedTodosArray));

    res.json({message: "delete todo"});
  } catch (err) {
    res.json({
      error: {
        message: err.message,
      },
    });
  }
});

app.patch("/todos/:id", (req, res) => {
  const {id} = req.params;
  console.log(typeof req.id, req.id);
  console.log(id, typeof id, "this is the id in the patch method");
  const {body} = req;

  try {
    if (!parseFloat(id)) {
      throw new Error(`id: "${id}" is not of type number`);
    }

    if (!body.text && !body.isDone) {
      throw new Error(
        `body of request requires properties of either "text" or "isDone"`
      );
    }

    const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));
    let isIdCorrect = false;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === Number(id)) {
        isIdCorrect = true;
        return {...todo, ...body};
      } else {
        return todo;
      }
    });

    if (!isIdCorrect) {
      throw new Error(`id: "${id}" is incorrect`);
    }

    fs.writeFileSync("todos.json", JSON.stringify(updatedTodos));

    res.json({message: "updated todos", todos: updatedTodos});
  } catch (err) {
    res.json({
      error: {
        message: err.message,
      },
    });
  }
});

app.listen(PORT, () => console.log("server is listening on port:", PORT));
