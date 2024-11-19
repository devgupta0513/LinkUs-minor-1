import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
            // const User = await JSON.parse(sessionStorage.getItem("User"));
            const User = Cookies.get("token");
            
            if(User !== undefined)

            {
                setUser(JSON.parse(Cookies.get("token")));
            }
            
            
            if (!User) {
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
