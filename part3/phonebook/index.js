const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((per) => per.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((per) => per.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  const length = persons.length;
  const time = new Date().toString();
  response.send(
    "<p>Phonebook has info for " + length + " people</p><p>" + time + "</p>"
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const maxId = Math.floor(Math.random() * 1000000);

  if (body.name && body.number) {
    const alreadyExists = persons.find((per) => per.name == body.name);
    if (!alreadyExists) {
      const person = {
        id: maxId + 1,
        name: body.name,
        number: body.number,
      };

      persons = persons.concat(person);

      return response.json(person);
    } else {
      return response.status(400).json({
        error: "name must be unique",
      });
    }
  } else {
    return response.status(400).json({
      error: "body must contain name and number values",
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
