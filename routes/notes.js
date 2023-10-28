const notesRouter = require('express').Router();
const fs = require('fs');
const notesdb = require('../db/db.json');
const generateUniqueId = require('generate-unique-id');
const readFromFile = require('../helpers/fsUtils');

notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notesRouter.post('/', (req, res) => {
    let noteString = JSON.stringify(req.body);
    let postId = generateUniqueId();
    noteString = noteString.slice(0, -1);
    noteString = `${noteString},"id":"${postId}"}`;
    if(JSON.stringify(notesdb).length > 0) {
        let dbContent = JSON.stringify(notesdb);
        dbContent = dbContent.substring(0, dbContent.length - 1);
        fs.truncate('./db/db.json', 0, (err, data) => {
            if (err) throw err;
            console.log(data);
        });
        fs.appendFile('./db/db.json', `${dbContent}, ${noteString}]`, (err, data) => {
            if (err) throw err;
            console.log(data);
        });
        res.json(notesdb);
    } else {
        fs.appendFile('./db/db.json', `[${noteString}]`, (err, data) => {
            if (err) throw err;
            console.log(data);
        });
        res.json(notesdb);
    }
});

module.exports = notesRouter;