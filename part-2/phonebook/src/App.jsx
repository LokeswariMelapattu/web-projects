import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonAdd from './components/PersonAdd.jsx'
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
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  // Handle form submission
  const handleSubmit = (event) =>
  {
    event.preventDefault()
    if (persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
    } else
    {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const fetchPersons = () =>
  {
    axios.get(apiUrl)
      .then(response =>
      {
        const personsData = response.data;
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App