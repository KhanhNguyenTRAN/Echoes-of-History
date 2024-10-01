const express = require('express');
const {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
} = require('../controllers/characterController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');
const { interactWithCharacter } = require('../chatbot/chatbotController');

const router = express.Router();

// Route to get all characters
router.get('/', getCharacters);

// Route to get a single character by ID
router.get('/:id', getCharacterById);

// Route to create a new character (protected, admin only)
router.post('/', protect, admin, createCharacter);

// Route to update a character (protected, admin only)
router.put('/:id', protect, admin, updateCharacter);

// Route to delete a character (protected, admin only)
router.delete('/:id', protect, admin, deleteCharacter);

// Route to interact with a character chatbot
router.post('/:id/chat', protect, interactWithCharacter);

module.exports = router;
