const mongoose = require('mongoose');

// Get command line arguments
const args = process.argv;

if (args.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> [name] [number]');
  process.exit(1);
}

const password = args[2];

const url = `mongodb+srv://lokeswarimelapattu1707:${password}@cluster0.7l87ueu.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB:', err.message));

// Define schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (args.length === 3) {
  // No extra args: list all entries
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });

} else if (args.length === 5) {
  // Add a new entry
  const name = args[3];
  const number = args[4];

  const person = new Person({ name, number });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });

} else {
  console.log('Invalid number of arguments.');
  console.log('To add: node mongo.js <password> <name> <number>');
  console.log('To list: node mongo.js <password>');
  mongoose.connection.close();
}