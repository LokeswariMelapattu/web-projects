import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonAdd from './components/PersonAdd.jsx'
import phoneService from './services/phonebook'
import axios from 'axios'

const apiUrl = 'http://localhost:3001/persons' // Replace with your actual API URL
const App = () =>
{

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Handle name change
  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  // Handle number change
  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  // Handle filter change
  const handleFilterChange = (event) =>
  {
    setFilter(event.target.value)
  }

  // Handle form submission
  const handleSubmit = (event) =>
  {
    event.preventDefault()
    if (persons.some(person => person.name === newName))
    {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`))
      {
        const existingPerson = persons.find(person => person.name === newName)
        const updatedPerson = { ...existingPerson, number: newNumber }
        phoneService
          .update(existingPerson.id, updatedPerson)
          .then(data =>
          {
            console.log('Updated:', data)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
          })
          .catch(error =>
          {
            console.log('Error while updating person:', error)
            alert('Error while updating person')
          });
      }
    } else
    {
      const newPerson = { name: newName, number: newNumber }
      phoneService
        .create(newPerson)
        .then(response => 
        {
          console.log('Added:', response)
          setPersons(persons.concat(newPerson))
        })
        .catch(error =>
        {
          console.log('Error while adding person:', error)
          alert('Error while adding person')
        });
    }

    setNewName('')
    setNewNumber('')
  }

  // Handle delete
  const handleDelete = (id) =>
  {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`))
    {
      phoneService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error =>
        {
          console.log('Error while deleting person:', error)
          alert('Error while deleting person')
        });
    }
  }

  // Fetch persons from the server
  const fetchPersons = () =>
  {
    console.log('Fetching persons from server...')

    phoneService
      .getAll()
      .then(response =>
      {
        console.log('Fetching persons from server- success', response)
        const personsData = response;
        setPersons(personsData)
      })
      .catch(error =>
      {
        console.error('Error fetching persons:', error)
      })
  }

  useEffect(() => fetchPersons(), [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonAdd
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App