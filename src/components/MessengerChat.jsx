import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Minus,
  Paperclip,
  Smile,
} from 'lucide-react';

const MessengerChat = ({
  businessName = 'Ignacio Furnitures',
  welcomeMessage = 'Hi! 👋 How can we help you today?',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'business',
      text: welcomeMessage,
      time: new Date(),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage,
      time: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    // Temporary automatic response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'business',
          text: 'Thanks for your message! We’ll get back to you shortly.',
          time: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`
            fixed
            right-4
            bottom-24
            z-[9999]
            w-[calc(100vw-2rem)]
            max-w-[380px]
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
            ring-1
            ring-black/10
            transition-all
            duration-300
            ${isMinimized ? 'h-[70px]' : 'h-[550px]'}
          `}
        >
          {/* Header */}
          <div className="flex h-[70px] items-center justify-between bg-[#0084ff] px-4 text-white">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white text-[#0084ff]">
                  <MessageCircle size={23} strokeWidth={2.5} />
                </div>

                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0084ff] bg-green-400" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  {businessName}
                </h3>

                <p className="text-xs text-white/80">
                  Typically replies instantly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-full p-2 transition hover:bg-white/10"
                aria-label="Minimize chat"
              >
                <Minus size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              <div className="h-[calc(100%-130px)] overflow-y-auto bg-[#f7f7f8] px-4 py-5">
                {/* Welcome */}
                <div className="mb-5 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0084ff] text-white">
                    <MessageCircle size={20} />
                  </div>

                  <p className="text-xs text-gray-500">
                    Start a conversation with {businessName}
                  </p>
                </div>

                {/* Messages */}
                <div className="space-y-3">
                  {messages.map((item) => {
                    const isUser = item.sender === 'user';

                    return (
                      <div
                        key={item.id}
                        className={`flex ${
                          isUser
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`
                            max-w-[80%]
                            rounded-2xl
                            px-4
                            py-2.5
                            text-sm
                            ${
                              isUser
                                ? 'rounded-br-md bg-[#0084ff] text-white'
                                : 'rounded-bl-md bg-white text-gray-800 shadow-sm'
                            }
                          `}
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {item.text}
                          </p>

                          <div
                            className={`
                              mt-1 text-[10px]
                              ${
                                isUser
                                  ? 'text-white/70'
                                  : 'text-gray-400'
                              }
                            `}
                          >
                            {formatTime(item.time)}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="flex h-[60px] items-center gap-2 border-t bg-white px-3">
                <button
                  type="button"
                  className="flex-shrink-0 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <Paperclip size={19} />
                </button>

                <div className="flex flex-1 items-center rounded-full bg-gray-100 px-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <Smile size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0084ff] text-white transition hover:bg-[#0077e6] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={17} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`
          fixed
          bottom-5
          right-5
          z-[9998]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#0084ff]
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
          hover:bg-[#0077e6]
          focus:outline-none
          focus:ring-4
          focus:ring-[#0084ff]/30
        `}
        aria-label="Open Messenger"
      >
        {isOpen ? (
          <X size={25} />
        ) : (
          <MessageCircle size={27} />
        )}

        {/* Notification */}
        {!isOpen && (
          <span className="absolute right-0 top-0 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
          </span>
        )}
      </button>
    </>
  );
};

export default MessengerChat;