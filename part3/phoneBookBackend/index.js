const express = require("express")
const morgan = require('morgan')
const cors = require("cors")

const app = express()

morgan.token("req-body", (req) => JSON.stringify(req.body))

app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(express.json())

let phoneBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
    response.send('<h1>Phone Book</h1>')
})

app.get("/api/persons", (request, response) => {
    response.json(phoneBook)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = phoneBook.find(p => p.id === id)
    person ? response.json(person) : response.status(404).end()
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    phoneBook = phoneBook.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => String(Math.floor(Math.random() * 1000000))

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'enter all details of person' 
        })
    }

    const personExist = phoneBook.find(p => p.name.toLowerCase() === body.name.toLowerCase())

    if (personExist) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    phoneBook = phoneBook.concat(person)

    response.json(person)
})

app.get("/info", (request, response) => {
    const date = new Date()
    response.send(`
        <div>Phonebook has info for ${phoneBook.length} people</div>
        <p>${date}</p>
        `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})