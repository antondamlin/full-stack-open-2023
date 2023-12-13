const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const contactName = process.argv[3];
const contactNumber = process.argv[4];

const url = `mongodb+srv://antondamlin:${password}@phonebook.q7ootaw.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (contactName && contactNumber) {
  const person = new Person({
    name: contactName,
    number: contactNumber,
  });

  person.save().then((result) => {
    console.log(`added ${contactName} number ${contactNumber} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
}
