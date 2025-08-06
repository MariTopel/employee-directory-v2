import express from "express";
const app = express();

//gives access to router
import employeesRouter from "./routes/employees.js";

//this is the middleware. this middleware tells Express to parse JSON request bodies
//express does not parse request bodies by default. app.use(express.json()) registers a peice of middleware that reads the raw JSON payload of ANY incoming request with a
// "Content-Type: application/json" header and populates req.body with the resulting object.
//without this the req.body will be undefined and i wont be able to grab req.body.name in the POST handler.
app.use(express.json());

// any request starting with /employees will be handled by employeesRouter
app.use("/employees", employeesRouter);

export default app;

import employees from "#db/employees";

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});
/* 
app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
 */
