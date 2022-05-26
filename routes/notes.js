const notes = require('express').Router();
const { readAndAppend, readFromFile, getUUID} = require('../helpers/fsUtils');

// GET
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST
notes.post('/', (req, res) => {
  console.log(req.body);
  
  const { title, text } = req.body;

 
  if (req.body) {
    const newNote = {
      id: getUUID(),
      title,
      text,
    };

    console.log(newNote);

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting new note');
  }
});

module.exports = notes;