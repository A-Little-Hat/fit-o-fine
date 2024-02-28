import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const Chatbot = ({ chatToggle }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ text: 'Fit-o-Fine 💊🩺🧑‍⚕️', user: false }]);


  const getAnswer = async () => {
    const res = await axios.post('http://localhost:4000/getChatResponse',{input})
    const {answer} = res.data
    return answer
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput('');
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await getAnswer(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
  };
  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div 
            style={{
              fontSize:"1rem",
              padding:"1rem"
            }}
          >
          <ReactMarkdown
            key={index}
            className={`message ${message.user ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </ReactMarkdown>
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