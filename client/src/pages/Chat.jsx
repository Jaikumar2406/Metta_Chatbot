// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const Chat = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, text: 'Hello! I\'m your MeTTa assistant. How can I help you today?', sender: 'ai' }
//   ]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add user message
//     const userMessage = { id: Date.now(), text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');

//     try {
//       // Call the backend API
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input })
//       });

//       const data = await response.json();
      
//       // Add AI response
//       const aiMessage = { 
//         id: Date.now() + 1, 
//         text: data.response.content, 
//         sender: 'ai' 
//       };
//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error:', error);
//       const errorMessage = { 
//         id: Date.now() + 1, 
//         text: 'Sorry, I encountered an error. Please try again.', 
//         sender: 'ai' 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto h-full flex flex-col">
//       <motion.div 
//         className="flex-1 overflow-y-auto mb-6 space-y-4 p-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {messages.map((message) => (
//           <motion.div
//             key={message.id}
//             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div 
//               className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-4 ${
//                 message.sender === 'user' 
//                   ? 'bg-white text-black' 
//                   : 'bg-gray-800 text-white'
//               }`}
//             >
//               {message.text}
//             </div>
//           </motion.div>
//         ))}
//         <div ref={messagesEndRef} />
//       </motion.div>

//       <motion.form 
//         onSubmit={handleSubmit}
//         className="flex gap-2"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
//         />
//         <button
//           type="submit"
//           className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//         >
//           Send
//         </button>
//       </motion.form>
//     </div>
//   );
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateText } from '../backend/api';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your MeTTa assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Call the backend API via api.ts
      const data = await generateText(userMessage.text);

      // Add AI response
      const aiMessage = { 
        id: Date.now() + 1, 
        text: data.answer, 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <motion.div 
        className="flex-1 overflow-y-auto mb-6 space-y-4 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div 
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-4 ${
                message.sender === 'user' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-white'
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        className="flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20"
        />
        <button
          type="submit"
          className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Send
        </button>
      </motion.form>
    </div>
  );
};

export default Chat;
