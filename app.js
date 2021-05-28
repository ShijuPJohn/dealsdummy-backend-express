const express = require('express')
const app = express();

// const contactsRoutes = require('./routes/contacts')
const authRoutes = require('./routes/auth')

app.use(express.json())

// app.use('/api/users', userRoutes)

// app.use('/api/contacts', contactsRoutes)

app.use('/api/auth', authRoutes)

module.exports = app