import { getUser, addUser } from "./database.js";
import { generateStuff } from "./generate.js";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

// my Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", async (req, res) => {
  res.render("login");
  console.log("Routed to Login");
});

app.get("/register", async (req, res) => {
  res.render("register");
});
app.get("/chat", async (req, res) => {
  res.render("chat");
});

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const content = await generateStuff(prompt);
  res.render("chat", { content });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (
    user.username === username &&
    (await bcrypt.compare(password, user.password))
  ) {
    res.redirect("/chat");
    console.log("Authenticated Successfully");
  } else {
    res.redirect("/login");
    console.log("Couldn't authenticate user");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const addedUser = await addUser(username, password);
  res.redirect("/login");
});

app.listen(3000, (req, res) => {
  console.log("Server Listening at port 3000.....");
});
