const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: false
    },
    deathDate: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    notableWorks: {
        type: [String],
        required: false
    },
    era: {
        type: String,
        required: true
    }
});

const Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
