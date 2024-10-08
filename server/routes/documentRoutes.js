var express = require('express');
const { createDocument, editDocument, viewDocument } = require('../Controllers/documentController');
var router = express.Router();

router.post('/', createDocument); // Create document
router.put('/document/:id', editDocument); // Edit document
router.get('/document/:id', viewDocument); // View document

module.exports = router;

