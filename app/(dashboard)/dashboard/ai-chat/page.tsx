"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Markdown } from "@/components/ui/markdown"; // Import the new Markdown component
import {
  Send,
  Brain,
  User,
  Loader2,
  Sparkles,
  FileText,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";
import { useChatWithAgent, useAgentStatus } from "@/hooks/api-hooks";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  extractedData?: any;
  confidenceScore?: number;
  suggestedActions?: Array<{
    action: string;
    label: string;
    description: string;
  }>;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your FalconCare AI assistant. I can help you with patient encounters, medical coding, claims processing, and more. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useChatWithAgent();
  const { data: agentStatus } = useAgentStatus();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await chatMutation.mutateAsync({
        message: input,
        session_id: currentSessionId || undefined,
      });

      if (!currentSessionId && response.session_id) {
        setCurrentSessionId(response.session_id);
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(response.timestamp),
        extractedData: response.extracted_data,
        confidenceScore: response.confidence_score,
        suggestedActions: response.suggested_actions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    {
      title: "Process Patient Encounter",
      description: "Upload clinical notes for AI processing",
      icon: FileText,
      prompt: "I need to process a new patient encounter with clinical notes",
    },
    {
      title: "Check Eligibility",
      description: "Verify patient insurance coverage",
      icon: Users,
      prompt: "I want to check patient eligibility for a service",
    },
    {
      title: "Create Claim",
      description: "Generate and submit insurance claim",
      icon: CreditCard,
      prompt: "Help me create a new insurance claim",
    },
    {
      title: "Review Denials",
      description: "Analyze denied claims and generate appeals",
      icon: Activity,
      prompt: "I need help with a denied claim and want to create an appeal",
    },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Intelligent RCM automation and support
            </p>
          </div>
        </div>

        {agentStatus && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Agent Online
          </Badge>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start space-y-2"
                  onClick={() => setInput(action.prompt)}
                >
                  <div className="flex items-center space-x-2">
                    <action.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{action.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    {action.description}
                  </p>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {/* Messages */}
            <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex space-x-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    )}
                  >
                    {/* Use Markdown component for AI responses, plain text for user messages */}
                    {message.role === "assistant" ? (
                      <Markdown
                        content={message.content}
                        className="prose-invert:text-primary-foreground"
                      />
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}

                    {/* Show confidence score for AI responses */}
                    {message.role === "assistant" &&
                      message.confidenceScore && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="h-3 w-3" />
                            <span className="text-xs">
                              Confidence:{" "}
                              {Math.round(message.confidenceScore * 100)}%
                            </span>
                          </div>
                        </div>
                      )}

                    {/* Show suggested actions */}
                    {message.suggestedActions &&
                      message.suggestedActions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <Separator />
                          <p className="text-xs font-medium">
                            Suggested actions:
                          </p>
                          <div className="space-y-1">
                            {message.suggestedActions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="h-auto p-2 text-xs"
                                onClick={() => setInput(action.label)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                    <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/30">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {chatMutation.isPending && (
                <div className="flex space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or describe what you need help with..."
                  disabled={chatMutation.isPending}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || chatMutation.isPending}
                  size="icon"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
