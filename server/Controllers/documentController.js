const Document = require('../models/documentModel'); 
const {catchAsyncErrors} = require('../middleware/catchAsyncErrors');

// Create a new document
const createDocument = async (req, res) => {
    try {
        const { title, content } = req.body; // Assuming these fields exist
        const newDocument = new Document({ title, content });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        console.error("Create Document Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Edit an existing document
const editDocument = async (req, res) => {
    try {
        const { id } = req.params; // Document ID from URL
        const updates = req.body; // Fields to update
        const updatedDocument = await Document.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json(updatedDocument);
    } catch (error) {
        console.error("Edit Document Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// View a specific document
const viewDocument = async (req, res) => {
    try {
        const { id } = req.params; // Document ID from URL
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json(document);
    } catch (error) {
        console.error("View Document Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createDocument,
    editDocument,
    viewDocument
};

