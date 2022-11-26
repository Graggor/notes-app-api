const PORT = 3000
const express = require('express')
const app = express()

var notes = require('./routes/notes')
var notebooks = require('./routes/notebooks')

app.use('/notes', notes)
app.use('/notebooks', notebooks)

app.listen(PORT, function(){
    console.log('Listening on port %d', PORT)
})
