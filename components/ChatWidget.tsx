
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { sendMessageToAdmin } from '../services/dataService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'AI' | 'LIVE'>('AI');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai' | 'admin'; text: string }[]>([
    { sender: 'ai', text: 'Hi! I am Siam\'s AI Assistant. Ask me anything about his designs, courses, or availability!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);

    if (mode === 'AI') {
        setIsLoading(true);
        const aiResponse = await sendMessageToGemini(userMessage);
        setIsLoading(false);
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } else {
        // Live Chat Mode
        await sendMessageToAdmin(userMessage);
        // In a full real-time system, we would listen to changes. 
        // Here we just acknowledge receipt.
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'admin', text: "Thanks for your message! Siam will reply to your email shortly." }]);
        }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-600 text-white p-4 rounded-full shadow-lg hover:bg-brand-700 transition-all hover:scale-105 flex items-center gap-2 group"
        >
          <MessageCircle size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">Chat with Siam</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-brand-600 p-4 text-white">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                {mode === 'AI' ? <Bot size={20} /> : <UserIcon size={20} />}
                <h3 className="font-semibold">{mode === 'AI' ? 'AI Assistant' : 'Live Message'}</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-brand-700 p-1 rounded">
                <X size={20} />
                </button>
            </div>
            
            {/* Mode Switcher */}
            <div className="flex bg-brand-700 p-1 rounded-lg text-xs font-bold">
                <button 
                    onClick={() => setMode('AI')} 
                    className={`flex-1 py-1 rounded ${mode === 'AI' ? 'bg-white text-brand-600' : 'text-brand-200 hover:text-white'}`}
                >
                    AI Bot
                </button>
                <button 
                    onClick={() => setMode('LIVE')}
                    className={`flex-1 py-1 rounded ${mode === 'LIVE' ? 'bg-white text-brand-600' : 'text-brand-200 hover:text-white'}`}
                >
                    Human
                </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={mode === 'AI' ? "Ask me anything..." : "Leave a message..."}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-brand-600 text-white p-2 rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
