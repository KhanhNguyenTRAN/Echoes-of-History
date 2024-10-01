const Character = require('../models/Character');

const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json(character);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createCharacter = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, birthDate, deathDate, imageUrl, notableWorks, era } = req.body;

        if (!name || !description || !era) {
            return res.status(400).json({ message: 'Name, description, and era are required.' });
        }

        const character = new Character({
            name,
            description,
            birthDate,
            deathDate,
            imageUrl,
            notableWorks,
            era
        });

        await character.save();
        res.status(201).json(character);
    } catch (error) {
        console.error('Error creating character:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        const updates = req.body;
        Object.assign(character, updates);

        await character.save();
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        await Character.deleteOne({ _id: character._id });
        res.json({ message: 'Character removed' });
    } catch (error) {
        console.error('Error deleting character:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
