"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const placeholders = [
    "Any skin concerns you may have",
    "What is Elastoderma?",
    "Tips to combat Acne",
    "Fighting dark circles",
    "Best sunscreens for UV protection",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const simulateResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Thanks for your message! How can I help you today?",
          sender: "bot",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: inputValue,
        sender: "user",
      },
    ]);
    setInputValue("");
    simulateResponse();
  };
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-chatsecondary text-white rounded-full p-4 shadow-lg hover:shadow-xl"
      >
        <Image
          src="/chaticon.svg"
          alt="Chat Icon button"
          width={18}
          height={18}
        />
      </button>

      {/* Chat Window */}
      <div
        className={`${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } origin-bottom-right transition-all duration-300 ease-out absolute bottom-20 right-0 w-96 h-[600px] bg-chatprimary rounded-lg shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* Header */}

        <BackgroundGradientAnimation>
          <div className="p-4 flex justify-between ">
            <div className="rounded-full w-[60px] h-[60px] px-5 py-3 bg-white text-3xl  text-chatsecondary">
              D
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white bg-opacity-20 text-xs rounded-full w-7 h-7 px-2"
            >
              <Image
                src="/xmark.svg"
                alt="Chat overlay close button"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="px-4 pb-4 text-white">
            <h2 className="text-2xl font-extrabold mb-1">DermaBot</h2>
            <p className="text-sm">Ask me anything. Happy to help.</p>
          </div>
        </BackgroundGradientAnimation>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-hidden no-scrollbar space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-chatsecondary text-white rounded-br-none"
                    : "bg-chataccent text-white rounded-bl-none"
                } animate-in slide-in-from-bottom-2 duration-300 text-base`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-chataccent rounded-lg p-3 rounded-bl-none animate-pulse">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-[#6F699B] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#6F699B] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#6F699B] rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-chatsecondary p-4 bg-chatprimary">
          <div className="flex space-x-2">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={handleSend}
            />
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "" : "hidden"} absolute bottom-[71px] right-5`}
      >
        <Image
          src="/chatdownarrow.svg"
          alt="Chat Down Key"
          width={12}
          height={18}
        />
      </div>
    </div>
  );
}
