import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Bot, User, Send, Mic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am Pragati, your civic governance assistant. I can help you check the status of your reports, understand government schemes, or guide you on temporary safety measures for civic issues. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('/api/ai/chat', { message: input });
      const reply = res.data?.reply || res.data || "I received your message. Let me look into that for you.";
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'ai', text: reply }]);
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'ai', text: "I'm sorry, I'm having trouble connecting to the AI service. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      setInput((prev) => prev + (prev ? " " : "") + "What is the status of my water complaint?");
    }
  };


  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            AI Assistant <Sparkles className="w-6 h-6 text-brand-500" />
          </h1>
          <p className="text-gray-500 font-medium">Ask Pragati for help, guidance, or status updates in any language.</p>
        </div>
      </motion.div>

      <Card animate className="flex-1 flex flex-col overflow-hidden bg-white shadow-xl shadow-brand-100/30 border-gray-200">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-gray-50/50 relative">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-brand-100 text-brand-700' : 'bg-gradient-to-br from-brand-600 to-teal-600 text-white'}`}>
                    {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed ${msg.sender === 'user' ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-brand-600 to-teal-600 text-white shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white border border-gray-100 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        <div className="p-5 bg-white border-t border-gray-100 z-10">
          <form onSubmit={handleSend} className="flex gap-3">
            <div className="flex-1 relative group">
              <Input
                placeholder="Type your message or use voice..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full pr-12 text-base py-3 bg-gray-50 focus:bg-white transition-colors"
                autoComplete="off"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                {isRecording && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-12 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded whitespace-nowrap">
                    Listening...
                  </motion.span>
                )}
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`p-2 rounded-xl transition-colors ${isRecording ? 'text-red-500 bg-red-50 animate-pulse' : 'text-gray-400 hover:text-brand-600 hover:bg-brand-50'}`}
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" className="flex-shrink-0 px-6 shadow-md shadow-brand-200" disabled={!input.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
