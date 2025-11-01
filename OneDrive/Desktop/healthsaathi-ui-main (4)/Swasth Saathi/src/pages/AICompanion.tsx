import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI Health Companion. I can help you with health information, medication reminders, symptom analysis, and general wellness guidance. How can I assist you today?",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "What are the symptoms of common cold?",
  "How can I improve my sleep quality?",
  "Tell me about healthy eating habits",
  "What exercises are good for back pain?",
];

export default function AICompanion() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke("ai-health-chat", {
        body: { message: input, userId: user.id },
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("AI chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive",
      });

      // Add error message to chat
      const errorMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            AI Health Companion
          </h1>
          <p className="text-muted-foreground">
            Get instant health guidance powered by AI • Available 24/7
          </p>
        </div>
        <Badge variant="outline" className="gap-2 px-4 py-2 bg-success/10 border-success/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-success font-medium">Online</span>
        </Badge>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-col shadow-elevated hover:shadow-glow transition-shadow h-[calc(100vh-20rem)] border-2">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
                    message.role === "user"
                      ? "bg-primary"
                      : "bg-gradient-primary"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%] shadow-card hover:shadow-elevated transition-shadow",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border-2 border-border"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-card border-2 border-border shadow-card">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-xs text-muted-foreground mb-3 font-medium">💡 Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestion(question)}
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t-2 border-border bg-card/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Ask me anything about your health..."
              className="flex-1 border-2 focus:border-primary transition-colors"
              disabled={loading}
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              className="shadow-lg hover:scale-105 transition-transform w-12 h-12" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground">
              💡 This AI provides health information but cannot replace professional medical advice
            </p>
            <div className="flex items-center gap-1 text-xs text-success">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="font-medium">24/7 Available</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
