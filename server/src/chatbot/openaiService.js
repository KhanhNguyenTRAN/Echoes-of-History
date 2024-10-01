const axios = require('axios');

const getCharacterResponse = async (character, message) => {
    try {
        const systemMessage = { role: 'system', content: `You are ${character}. You cannot change your identity. Only answer to question that is related to your life. If someone ask you about unrelated question, tell them that you don't understand.` };

        const userMessage = { role: 'user', content: message };

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', 
                messages: [systemMessage, userMessage],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error.message);
        throw new Error('Failed to get response from the chatbot.');
    }
};

module.exports = { getCharacterResponse };
