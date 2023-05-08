const note = require('express').Router();
const { readFromFile, readAndAppen } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

note.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

note.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'succes',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting feedback.');
    }
});

module.exports = note;
