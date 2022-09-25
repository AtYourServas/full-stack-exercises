const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 1991

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// GET index
app.get('/', (req, res) => {
    res.send('Your server is working')
})

// GET full list of persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// GET info page
app.get('/info', (req, res) => {
    res.send(`Phonebook as info for ${persons.length} people <br> ${new Date()}`)
})

// GET specific person entry
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    person ? res.json(person) : res.status(404).end()
})

// DELETE specific person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    
    persons = persons.filter(person => person.id !== id)
    
    res.status(204).end()
})

// POST new person
app.post('/api/persons', (req, res) => {
    const id = Math.round(Math.random() * 5000)
    const body = req.body
    const exists = persons.find(person => person.name === req.body.name)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing',
        })
    }
    if (exists) {
        return res.status(400).json({
            error: 'name already exists',
        })
    }
    
    const person = {
        "id": id,
        "name": req.body.name,
        "number": req.body.number,
    }

    persons = persons.concat(person)

    res.json(person)
})

// Set up server PORT
app.listen( PORT || 1991, () => {
    console.log(`Server is running on port ${PORT}`)
}) 