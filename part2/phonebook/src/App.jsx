import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook'
import Notification from './components/Notification'

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value} onChange={props.handleEvent}/>
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.formSubmit}>
            <div>
                name: <input value={props.input1} onChange={props.event1}/>
            </div>
            <div>
                number: <input value={props.input2} onChange={props.event2}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({person, deletePerson}) => {
    return <div> {person.name} {person.number} <button onClick={deletePerson}>delete</button> </div>
} 

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')
    const [successMessage, setSuccessMessage] = useState({})

    useEffect(() => {
        phonebookServices
          .getAll()
          .then(initialPersons  => {
            setPersons(initialPersons)
          })
      }, [])

    const personsToShow = searchName ? persons.filter(person => person.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1) : persons

    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
      setSearchName(event.target.value)
    }
    
    const clearMessage = () => {
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personName = newName.trim()
        const personNumber = newNumber.trim()

        if (personName === "" || personNumber === "") {
            alert(`Fill all details first`)
            return
        }
        const searchedPerson = persons.find(person => person.name.toLowerCase() === personName.toLowerCase())

        if (searchedPerson) {
            if (window.confirm(`${personName} is already added to phonebook, replace old number with new one`)) {
              const changedPerson = { ...searchedPerson, number: personNumber }
              phonebookServices
                .update(changedPerson.id, changedPerson)
                .then((returnedPerson) => {
                  setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
                  setSuccessMessage({message:`${personName}'s number updated`, class: "success"})
                  clearMessage()
                })
                .catch(() => {
                  setPersons(persons.filter(person => person.id !== changedPerson.id))
                  setSuccessMessage({message:`Information of ${personName} has already been removed from server`, class: "error"})
                  clearMessage()
                })
                setNewName('')
                setNewNumber('')
            } else {
              setSuccessMessage({message:`add unique person`, class: "error"})
              clearMessage()
            }
            return
        }

        const phonebookObject = {
            name: personName,
            number: personNumber,
        }

        phonebookServices
            .create(phonebookObject)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
                setSuccessMessage({message: `Added ${personName}`, class:"success"})
                clearMessage()
            })
    }

    const deletePerson = (id) => {
        if (window.confirm("Are you sure you want to delete this person?")) {
          phonebookServices
            .deleteEntry(id)
            .then(() => {
              setPersons(persons.filter(person => person.id !== id))
              setSuccessMessage({message:`person deleted successfully`, class: "success"})
              clearMessage()
            })
            .catch(() => {
              setPersons(persons.filter(person => person.id !== id))
              setSuccessMessage({message:`This person was already deleted or not found on the server.`, class: "error"})
              clearMessage()
            })
        }
    }

  return (
    <div>
        <h2>Phonebook</h2>
        <Notification message={successMessage}/>
        <Filter value={searchName} handleEvent={handleSearchChange}/>
        <h3>add a new</h3>
        <PersonForm formSubmit={addPerson} input1={newName} event1={handleNameChange} input2={newNumber} event2={handleNumberChange}/>
        <h3>Numbers</h3>
        {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>)}
    </div>
  )
}

export default App