const mongoose = require('mongoose')
const User = require('./models/user')
const Notebook = require('./models/notebook')
const Note = require('./models/note')

mongoose
    .connect('mongodb://127.0.0.1:27017/noteapp')
    .then(() => {
        console.log('Succesfully connected to the database!')
    })
    .catch(() => {
        console.log('Error while connecting to the database!')
    })

const seedUsers = [
    {
        username: "Graggor",
        password: "yes"
    },
    {
        username: "V0lky1",
        password: "yes"
    }
]

const seedDB = async () => {
    await User.deleteMany({})
    await Notebook.deleteMany({})
    await Note.deleteMany({})
    return User.create(seedUsers)
}

seedDB()
    .then((users) => {
        const noteBooks = [
            {
                name: "Graggor's first notebook",
                owner: users[0],
            },
            {
                name: "V0lky1's first notebook",
                owner: users[1],
            },
        ]
        return Notebook.create(noteBooks)
    })
    .then((notebooks) => {
        const notes = [
            {
                notebook: notebooks[0]._id,
                owner: notebooks[0].owner,
                title: "Graggor's first note",
                content: "I don't know what to write here.",
            }, 
            {
                notebook: notebooks[1]._id,
                owner: notebooks[1].owner,
                title: "V0lky1's first note",
                content: "I also don't know what to write here.",
            }
        ]
        return Note.create(notes)
    }).then(() => {
         mongoose.connection.close()
    })
    