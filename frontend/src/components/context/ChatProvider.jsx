import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const navigate = useNavigate();
    const endPoint = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        const fetchUserData = async () => {
            const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
            setUser(userInfo);
            if (!userInfo) {
                navigate("/");
            }
        };
        fetchUserData();
    }, [navigate])
    
    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
                endPoint
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
