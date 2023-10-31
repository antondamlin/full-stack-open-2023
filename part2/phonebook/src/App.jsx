import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    personServices
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.some((person) => person.name === newName);
    if (
      found &&
      window.confirm(
        `${newName} is already added to phonebook, do you want to update the number?`
      )
    ) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      const personInArray = persons.find((per) => per.name === newName);
      personServices
        .update(personInArray.id, personObject)
        .then((response) => {
          const newArray = persons.map((p) => {
            if (p.id === response.data.id) {
              return response.data;
            } else {
              return p;
            }
          });
          setPersons(newArray);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!found) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personServices
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personServices
        .remove(person.id)
        .then(() => {
          personServices.getAll().then((response) => {
            console.log(response.data);
            setPersons(response.data);
          });
        })
        .catch((error) => {
          personServices.getAll().then((response) => {
            setPersons(response.data);
          });
        });
    }
  };

  const handleContactChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsFiltered = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addNewPerson={addPerson}
        nameVal={newName}
        numberVal={newNumber}
        changeName={handleContactChange}
        changeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsFiltered} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
