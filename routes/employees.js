//routes/employees.js
//this file will exclusively hold the endpots that deal with "employees". it makes it easy to find and modify these routes

import express from "express";
//imports the employees array from the in memory database
//dont use a # unless i am going to plan to change the location of employees or other files in relation to this file
import employees from "#db/employees";

//initialize the router
//this creates a mini app that can define its own routes and middleware, which can be later pluged into the main app
const router = express.Router();

// "/" will map to /emplyees/ once mounted, allegedly
//keep logic for listing employees bundled under one router
router.get("/", (req, res) => {
  //reponds with the full list of employees
  res.send(employees);
});

// GET /employees/random → return one random employee
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

//define the GET by ID router
//":id" captires whatever is after /employees/ as req.params.id
//this converts it to a number and searches the array
//if not found then a 404 is sent, otherwise return the match
router.get("/:id", (req, res) => {
  const id = Number(req.params.id); //reads the dynamic segment
  const employee = employees.find((e) => e.id === id);
  if (!employee) return res.status(404).send("Employee not found");
  res.send(employee);
});

// POST /employees → add a new employee
router.post("/", (req, res) => {
  if (!req.body) {
    // No JSON body was parsed → respond 400
    return res.status(400).send("Name is required");
  }

  const { name } = req.body;

  // 1) Body must be present and name must be a non-empty string
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).send("Name is required");
  }

  // 2) Create the new employee
  const newEmployee = {
    id: employees.length + 1, // simple unique ID
    name: name.trim(),
  };

  // 3) Add to our in-memory array
  employees.push(newEmployee);

  // 4) Respond with 201 and the new record
  res.status(201).send(newEmployee);
});

//allows app.js to import and mounth this router under the /employees path
export default router;
