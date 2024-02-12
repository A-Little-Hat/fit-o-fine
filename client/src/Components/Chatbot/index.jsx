import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ chatToggle }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ text: 'Fit-o-Fine 💊🩺🧑‍⚕️', user: false }]);


  const getAnswer = async () => {
    const apiEndpoint = 'http://127.0.0.1:5000/qa?q=' + input;
    try {
      const response = await axios.get(apiEndpoint);
      return response["data"]["res"]
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
      return '';
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await getAnswer(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput('');
  };
  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className='backButtonDesignDiv' >
        <button className='closeButton' onClick={chatToggle}>X</button>
        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default Chatbot;