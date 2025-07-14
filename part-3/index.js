require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const Person = require('./models/person')
const app = express();

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
console.log('CWD:', process.cwd());
console.log('Serving static from:', path.resolve('dist'));

app.use(cors());
app.use(express.static('dist'))
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

 

app.get('/info', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error)); 
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person
      .findById(id)
      .then(person => {
        if (person) {
          response.json(person);
        } else {
          response.status(404).end();
        }
      })
      .catch(error => next(error)); 
                   
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
      .then(result => {
          console.log(`Deleted person with id ${id}`);
          response.status(204).end();
        })
      .catch(error => next(error)); 
});

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body;
     
    if (!name) {
        return response.status(400).json({ error: 'Name missing' });
    }
    if (!number) {
        return response.status(400).json({ error: 'Number missing' });
    }
    // Check if the name already exists
    // if (persons.some(p => p.name === person.name)) {
    //     return response.status(400).json({ error: 'Name must be unique' });
    // }
     // Generate a new random ID in a large range
  //const id = Math.floor(Math.random() * 1000000)
    // Check if the ID already exists
    // if (persons.some(p => p.id === id.toString())) {  
    //     return response.status(400).json({ error: 'ID already exists' });
    // }
    // Add the new person with the generated ID
    const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error));  
});
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;
      
    Person.findById(request.params.id)
      .then(person => {
        if (!person) {
          return response.status(404).end();
        }
        person.name = name;
        person.number = number;

        return person.save().then(updatedPerson => {
          response.json(updatedPerson);
        });
      }) 
      .catch(error => next(error));
       
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handling unknown endpoints
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error) // Pass the error to the next middleware
}


// handling errors
app.use(errorHandler)

const PORT = process.env.PORT  
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});  