import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const predefinedResponses: { [key: string]: string } = {
  courses: "We offer a variety of courses including Web Development, Full Stack Development, Data Science, AI/ML, Cyber Security, and Cloud Computing. Each course includes live sessions, hands-on projects, and mentorship. Visit our Courses page to explore more!",
  internship: "Our internship program offers real-world experience with stipends, working on live projects. You'll receive a verified certificate, letter of recommendation, and placement support. Apply now through our Internship page!",
  fees: "Course fees vary based on the program duration and type. We offer flexible payment options and EMI plans. Contact us at info@zentureinfo.com or call +91-9876543210 for detailed fee structure.",
  contact: "You can reach us at:\n📧 Email: info@zentureinfo.com\n📞 Phone: +91-9876543210\n📍 Location: Tech Park, Bangalore\n\nWe're available Mon-Sat, 9 AM - 6 PM IST.",
  placement: "We have 95% placement rate with 500+ hiring partners including Google, Amazon, Microsoft, and top startups. Our dedicated placement team provides resume building, mock interviews, and direct referrals.",
  certificate: "All our courses come with industry-recognized certificates upon completion. Internship participants receive additional completion certificates and letters of recommendation.",
  hello: "Hello! 👋 Welcome to ZentureInfo Tech! I'm here to help you with information about our courses, internships, fees, and more. What would you like to know?",
  hi: "Hi there! 👋 Welcome to ZentureInfo Tech! How can I assist you today?",
  default: "I'm here to help! You can ask me about:\n• Courses\n• Internship programs\n• Fees & payment\n• Placements\n• Certificates\n• Contact information\n\nType any of these topics or ask your question!",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to ZentureInfo Tech! I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse: Message = {
      id: messages.length + 2,
      text: getResponse(inputValue),
      isBot: true,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickOptions = ["Courses", "Internship", "Fees", "Placement"];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-bg shadow-glass-lg flex items-center justify-center z-40 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full gradient-bg animate-ping opacity-30" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-6 right-6 w-[380px] h-[520px] glass-card rounded-3xl shadow-glass-lg overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-primary-foreground">
                  <div className="font-semibold">ZentureInfo Bot</div>
                  <div className="text-xs opacity-80">Always here to help</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground rounded-tl-none"
                        : "gradient-bg text-primary-foreground rounded-tr-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-[10px] opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Options */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setInputValue(option);
                      handleSend();
                    }}
                    className="px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="gradient-bg text-primary-foreground"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
