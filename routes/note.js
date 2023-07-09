const express = require('express');
const router = express.Router();
const handleNewNote = require('../controllers/noteSaveController');
const handlePutNote = require('../controllers/notePutController');
const handleEditNote = require('../controllers/noteEditController');
const removeNote = require('../controllers/removeNote');
const removeSubject = require('../controllers/removeSubject');
const verifyToken = require('../middleware/verifyToken');

router.post('/:name/post', verifyToken, handleNewNote);
router.put('/:name/put', verifyToken, handlePutNote);
router.put('/:name/:slug/edit', verifyToken, handleEditNote);
router.delete('/:name/:subject', verifyToken, removeSubject);
router.delete('/:name/:subject/:slug', verifyToken, removeNote);

module.exports = router;
