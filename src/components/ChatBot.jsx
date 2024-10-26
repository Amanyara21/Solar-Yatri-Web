import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

export const ChatBot = () => {
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  const [user, setUser]= useState(null);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(()=>{
    const getUser=async()=>{
        const response = await axios.get('https://solar-yatri-backend.vercel.app/api/getuser', {
                headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4" }
            });

        console.log('====================================');
        setUser(response.data.user);
        console.log('====================================');
    }
    getUser()
},[])

  const handleUserInput = (value) => {
    console.log(value);
    setUserInput(value);
  };
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async (messageText) => {
    if (messageText.trim() === "") return;
  
    try {
      const userPreferences = user
        ? `User Preferences - Name: ${user.name}, Email: ${user.email}, Household Size: ${user.houseHoldSize}, Income: ${user.income}, Location: ${user.location}, Monthly Electricity Usage: ${user.monthlyElectricityUsage}`
        : "No user preferences available.";
  
      const prompt = `Imagine you have expertise in solar power plant project researcher. ${user.toString()} Based on this preferences, answer the queries given by user: ${messageText}`;
      
      console.log('====================================');
      console.log(prompt);
      console.log('====================================');
  
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: messageText },
        { type: "bot", message: text },
      ]);
      setUserInput("");
      console.log(text);
    } catch (e) {
      console.log("Error occurred while fetching", e);
    }
  };
  

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chatHistory.map((elt, i) => (
              <Message
                key={i}
                model={{
                  message: elt.message,
                  sender: elt.type,
                  sentTime: "just now",

                  direction: elt.type === "user" ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={userInput}
            onChange={(value) => handleUserInput(value)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};