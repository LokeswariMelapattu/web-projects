import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonAdd from './components/PersonAdd.jsx'
import phoneService from './services/phonebook'
import './index.css'

const Notification = ({ isError, message }) =>
{
  if (message === null)
  {
    return null
  }
  return (
    <div className={isError ? 'error' : 'success'}>
      {message}
    </div>
  )
}

const App = () =>
{

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)


  // Handle error message
  const handleNotification = (isError, message) =>
  {
    setIsError(isError)
    setErrorMessage(message)
    setTimeout(() =>
    {
      setErrorMessage(null)
    }
      , 5000)
  }
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
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`))
      {
        const updatedPerson = { ...existingPerson, number: newNumber }
        phoneService
          .update(existingPerson.id, updatedPerson)
          .then(data =>
          {
            handleNotification(false, `Number updated to the person ${newName}`)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
          })
          .catch(error =>
          {
            handleNotification(true, `Error while updating the person ${newName}`)
            console.log('Error while updating person:', error)
          });
      }
    } else
    {
      const newPerson = { name: newName, number: newNumber }
      phoneService
        .create(newPerson)
        .then(response => 
        {
          handleNotification(false, `Added ${newName}`)
          console.log('Added:', response)
          setPersons(persons.concat(newPerson))
        })
        .catch(error =>
        {
          handleNotification(true, `Information of ${newName} has already been removed from server`)
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
    const delPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${delPerson.name}?`))
    {
      phoneService
        .remove(id)
        .then(() =>
        {
          setPersons(persons.filter(person => person.id !== id))
          handleNotification(false, `Deleted ${delPerson.name}`)
        })
        .catch(error =>
        {
          handleNotification(true, `Information of ${delPerson.name} has already been removed from server`)
          console.log('Error while deleting person:', error)
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
        handleNotification(true, 'Error fetching persons')
        console.error('Error fetching persons:', error)
      })
  }

  useEffect(() => fetchPersons(), [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isError={isError} message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new person</h2>
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