import { useState } from 'react'
import React, { useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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

const DeleteForm = ({deletePerson, personToDelete, handleDeleteChange}) => {
  return(
    <form onSubmit={deletePerson}>
      <div>
        <input value={personToDelete} onChange={handleDeleteChange} />
        <button type="submit">delete</button>
      </div>
    </form>
  )

}

const Persons = ({peopleToShow}) => {
  return(
    <div>{peopleToShow.map(person => <p key={person.name}>{person.name} {person.number} {person.deleteButton}</p>
  )}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber]= useState('')
  const [filterCond, setFilterCond] = useState('')
  const [personToDelete, setPersonToDelete] = useState('')  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
    }

    let id=''
    if(persons.find( person => person.name ===newName) || persons.find( person => person.number === newNumber)){
      if(persons.find( person => person.name ===newName)){
        alert(`Name ${newName} is already added to phonebook`)
        
        if(window.confirm(`Replace the old number with a new one?`)){
         id= persons.find(person => person.name ===newName).id}
         const changedPerson = {...persons.find(person => person.id ===id), number: newNumber}
         
         personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
      }
      if(persons.find( person => person.number ===newNumber)){
        alert(`Number ${newNumber} is already added to phonebook`)}  
    }
   
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson= (event) => {
    event.preventDefault()
    let id=''

    if( window.confirm(`Delete ${personToDelete}?`)){
    
  
      if (persons.find(person => person.name === personToDelete)){
        id = persons.find(person => person.name === personToDelete).id}
      else{ 
         id = 'not found'
        
        }

    personService
      .deletion(id)
      .then( returnedPerson =>{
        setPersons(persons.filter(person => person.id != returnedPerson.id))
        setPersonToDelete('')
      })
    }
  }
      
   const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleCondChange = (event) => {
    //console.log(event.target.value)
    const condition = event.target.value
    setFilterCond(condition)
    //console.log('filterCond', filterCond, 'condition', condition)
  }

  const handleDeleteChange = (event) => {
    console.log(event.target.value)
    setPersonToDelete(event.target.value)
    console.log('personToDelete', personToDelete)
  }

const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filterCond.toLowerCase()))
 
useEffect(() => {
  console.log('filterCond', filterCond);
  }, [filterCond]); 


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterCond={filterCond} handleCondChange={handleCondChange}/>
      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Delete a contact</h2>
      <DeleteForm deletePerson={deletePerson} personToDelete={personToDelete} handleDeleteChange={handleDeleteChange}/>
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )

}

export default App
