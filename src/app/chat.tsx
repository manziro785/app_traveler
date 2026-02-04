import { Link } from "expo-router";
import { ChevronLeft, Send, Sparkles } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Message {
  id: number;
  type: "ai" | "user";
  text: string;
  suggestions?: string[];
  actions?: { label: string; onPress?: () => void }[];
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      text: "Привет! Я твой AI-гид по Кыргызстану. Что хочешь узнать?",
      suggestions: [
        "Где туалет рядом?",
        "Что посмотреть?",
        "Какая погода?",
        "Изменить маршрут",
      ],
    },
    {
      id: 2,
      type: "user",
      text: "Где поблизости нормальный туалет?",
    },
    {
      id: 3,
      type: "ai",
      text: "В 200 метрах есть кафе Coffeedelia — можешь спокойно зайти. Ещё вариант: ТЦ ЦУМ в 5 минутах ходьбы.",
      actions: [{ label: "Показать на карте" }, { label: "Маршрут" }],
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: "user",
        text: message.trim(),
      };

      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: "ai",
          text: "Понял! Ищу информацию для тебя...",
        };
        setMessages((prev) => [...prev, aiResponse]);

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1000);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
      keyboardVerticalOffset={0}
    >
      <View className="bg-white border-b border-gray-200 px-4 py-3 mt-10">
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 absolute left-0 z-10">
            <Link href="/(tabs)">
              <ChevronLeft color="gray" size={24} />
            </Link>
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center justify-center gap-3">
            <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center">
              <Sparkles color="#fff" size={20} />
            </View>
            <View className="items-center">
              <Text className="text-gray-900 font-semibold text-base">
                Trip AI
              </Text>
              <Text className="text-gray-500 text-sm">Онлайн</Text>
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
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <View className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <View className="flex-row items-center gap-1 mb-2">
                      <Sparkles color="#3B82F6" size={14} />
                      <Text className="text-blue-600 font-medium text-xs">
                        AI Гид
                      </Text>
                    </View>
                    <Text className="text-gray-800 text-base leading-6">
                      {msg.text}
                    </Text>
                    {msg.suggestions && (
                      <View className="flex-row flex-wrap gap-2 mt-5">
                        {msg.suggestions.map((suggestion, index) => (
                          <TouchableOpacity
                            key={index}
                            className="bg-blue-100 px-3 py-2 rounded-full"
                            activeOpacity={0.7}
                            onPress={() => handleSuggestionPress(suggestion)}
                          >
                            <Text className="text-blue-600 text-sm">
                              {suggestion}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}{" "}
                    {msg.actions && (
                      <View className="flex-row flex-wrap gap-2 mt-5">
                        {msg.actions.map((action, index) => (
                          <TouchableOpacity
                            key={index}
                            className="bg-blue-100 px-4 py-2 rounded-full"
                            activeOpacity={0.7}
                            onPress={action.onPress}
                          >
                            <Text className="text-blue-600 text-sm font-medium">
                              {action.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}{" "}
                  </View>
                </View>
              </View>
            ) : (
              <View className="w-full justify-between flex-row">
                <View></View>
                <View className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-sm">
                  <Text className="text-white text-base leading-6">
                    {msg.text}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View className="bg-white border-t border-gray-200 px-4 py-3 pb-10">
        <View className="flex-row items-end gap-2 bg-gray-100 rounded-2xl px-4 py-2">
          <TextInput
            className="flex-1 text-gray-900 text-base py-2 max-h-24"
            placeholder="Спроси что-нибудь..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            className={`w-9 h-9 rounded-full items-center justify-center mb-1 p-2 ${
              message.trim() ? "bg-blue-600" : "bg-gray-300"
            }`}
            activeOpacity={0.7}
            disabled={!message.trim()}
          >
            <Send color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
