import express from "express";

//gives access to router
import employeesRouter from "./routes/employees.js";

const app = express();

//this is the middleware. this middleware tells Express to parse JSON request bodies
//express does not parse request bodies by default. app.use(express.json()) registers a peice of middleware that reads the raw JSON payload of ANY incoming request with a
// "Content-Type: application/json" header and populates req.body with the resulting object.
//without this the req.body will be undefined and i wont be able to grab req.body.name in the POST handler.
app.use(express.json());

// any request starting with /employees will be handled by employeesRouter
app.use("/employees", employeesRouter);

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// 500 on any uncaught errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

export default app;

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
