const mongoose = require('mongoose');
const { getCharacterResponse } = require('./openaiService');
const Character = require('../models/Character');

const interactWithCharacter = async (req, res) => {
    const characterId = req.params.id;

    try {
        const character = await Character.findById(new mongoose.Types.ObjectId(characterId));
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        const response = await getCharacterResponse(character.name, req.body.message);

        res.json({ response });
    } catch (error) {
        console.error('Error interacting with character:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { interactWithCharacter };
