import { useState } from 'react'
import React, { useEffect } from 'react'

const Filter = ({filterCond, handleCondChange}) => {
  return (
    <div>
      filter shown with <input value={filterCond} onChange={handleCondChange}/>
    </div>
  )
}

const PersonForm =({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({personsToShow}) => {
  return(
    <div>{personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>
  )}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber]= useState('')
  const [filterCond, setFilterCond] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.find( person => person.name ===newName)){
      alert(`Name ${newName} is already added to phonebook`)
    }
    if (persons.find( person => person.number === newNumber)){
      alert(`Number ${newNumber} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleCondChange = (event) => {
    console.log(event.target.value)
    const condition = event.target.value
    setFilterCond(condition)
    console.log('filterCond', filterCond, 'condition', condition)
  }

const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterCond.toLowerCase()))
 
useEffect(() => {
  console.log('filterCond', filterCond);
  }, [filterCond]); 


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterCond={filterCond} handleCondChange={handleCondChange}/>
      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App
