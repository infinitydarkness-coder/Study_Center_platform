import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: "Hi! I'm your AI study assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "Summarize notes",
    "Important questions",
    "Create study plan",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm processing your request. This is a demo response!" },
      ]);
    }, 500);
  };

  const handleSuggestion = (suggestion: string) => {
    setMessages([...messages, { role: "user", text: suggestion }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Sure! I can help you with "${suggestion}". What specific topic would you like to focus on?` },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-50"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">AI Study Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Suggestions (only show if no messages from user yet) */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quick actions:</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestion(suggestion)}
                    className="w-full px-4 py-2 bg-secondary text-foreground rounded-2xl hover:bg-secondary/80 transition-colors text-left text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-secondary rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
