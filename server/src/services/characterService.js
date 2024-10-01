const Character = require('../models/Character');

// Service function to find a character by ID
const findCharacterById = async (id) => {
    return await Character.findById(id);
};

module.exports = {
    findCharacterById,
};
