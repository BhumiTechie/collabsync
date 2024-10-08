const mongoose = require('mongoose');


// Define the document schema
const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    content: {
        type: String,
        required: true, // Content is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set the update date
    },
});

// Middleware to update the updatedAt field before saving
documentSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update the updatedAt field
    next();
});

// Create the model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;