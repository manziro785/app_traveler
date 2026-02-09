import { useRouter } from "expo-router";
import { ChevronLeft, Loader2, Send, Sparkles } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useChat } from "../features/chat/model/useAi";

interface Message {
  id: string;
  type: "ai" | "user";
  text: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: { label: string; onPress?: () => void }[];
}

const Chat = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      text: "Hi! I'm your AI guide to Kyrgyzstan. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Where is the nearest restroom?",
        "What should I see?",
        "What's the weather like?",
        "Change the route",
      ],
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);
  const { mutateAsync, isPending } = useChat();

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (message.trim() && !isPending) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        text: message.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      const currentMessage = message.trim();
      setMessage("");

      try {
        const response = await mutateAsync({ message: currentMessage });
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: "ai",
          text:
            response.message ||
            response.data?.message ||
            "Извините, не понял ваш вопрос.",
          timestamp: new Date(),
          suggestions: response.suggestions,
          actions: response.actions,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Chat error:", error);

        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          type: "ai",
          text: "Упс! Что-то пошло не так. Попробуйте ещё раз.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
      keyboardVerticalOffset={0}
    >
      <View className="bg-white border-b border-gray-200 px-4 py-3 mt-10">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 absolute left-0 z-10"
          >
            <ChevronLeft color="gray" size={24} />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center justify-center gap-3">
            <View className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full items-center justify-center">
              <Sparkles color="#fff" size={20} />
            </View>
            <View className="items-center">
              <Text className="text-gray-900 font-semibold text-base">
                Trip AI
              </Text>
              <View className="flex-row items-center gap-1">
                <View className="w-2 h-2 bg-green-500 rounded-full" />
                <Text className="text-gray-500 text-xs">Онлайн</Text>
              </View>
            </View>
          </View>

          <View className="w-10" />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <View key={msg.id} className="mb-4">
            {msg.type === "ai" ? (
              <View className="flex-row gap-2 max-w-[85%]">
                <View className="flex-1">
                  <View className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                    <View className="flex-row items-center gap-1 mb-2">
                      <Sparkles color="#3B82F6" size={14} />
                      <Text className="text-blue-600 font-medium text-xs">
                        AI Guide
                      </Text>
                    </View>
                    <Text className="text-gray-800 text-base leading-6">
                      {msg.text}
                    </Text>

                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <View className="flex-row flex-wrap gap-2 mt-3">
                        {msg.suggestions.map((suggestion, index) => (
                          <TouchableOpacity
                            key={index}
                            className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-full"
                            activeOpacity={0.7}
                            onPress={() => handleSuggestionPress(suggestion)}
                          >
                            <Text className="text-blue-600 text-sm">
                              {suggestion}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {msg.actions && msg.actions.length > 0 && (
                      <View className="flex-row flex-wrap gap-2 mt-3">
                        {msg.actions.map((action, index) => (
                          <TouchableOpacity
                            key={index}
                            className="bg-blue-500 px-4 py-2 rounded-full shadow-sm"
                            activeOpacity={0.7}
                            onPress={action.onPress}
                          >
                            <Text className="text-white text-sm font-medium">
                              {action.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-400 text-xs mt-1 ml-2">
                    {formatTime(msg.timestamp)}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="w-full items-end">
                <View className="max-w-[85%]">
                  <View className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                    <Text className="text-white text-base leading-6">
                      {msg.text}
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-xs mt-1 mr-2 text-right">
                    {formatTime(msg.timestamp)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {isPending && (
          <View className="flex-row gap-2 max-w-[85%] mb-4">
            <View className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
              <View className="flex-row items-center gap-2">
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text className="text-gray-500 text-sm">AI thinks...</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="bg-white border-t border-gray-200 px-4 py-3 pb-10">
        <View className="flex-row items-end gap-2 bg-gray-100 rounded-2xl px-4 py-2">
          <TextInput
            className="flex-1 text-gray-900 text-base py-2 max-h-24"
            placeholder="Ask somethinga..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            editable={!isPending}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            className={`w-9 h-9 rounded-full items-center justify-center mb-1 ${
              message.trim() && !isPending ? "bg-blue-600" : "bg-gray-300"
            }`}
            activeOpacity={0.7}
            disabled={!message.trim() || isPending}
          >
            {isPending ? (
              <Loader2 color="#fff" size={18} className="animate-spin" />
            ) : (
              <Send color="#fff" size={18} />
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-xs mt-2 text-center">
          AI может допускать ошибки
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
