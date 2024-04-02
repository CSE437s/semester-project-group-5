// Chatbot.js
import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { DeepChat } from "deep-chat-react";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  const initialMessages = [
    {
      role: "ai",
      text: "Hey, I'm Beri, your personal financial assistant! What can I help you with today?",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        alignItems: "flex-end",
      }}
    >
      {isOpen ? (
        <>
          <DeepChat
            demo={true}
            style={{ borderRadius: "10px" }}
            textInput={{ placeholder: { text: "Welcome to the demo!" } }}
            initialMessages={initialMessages}
          />
          <Fab
            variant="contained"
            color="primary"
            onClick={toggleChat}
            sx={{ borderRadius: "50%" }}
          >
            <ChatIcon />
          </Fab>
        </>
      ) : (
        <Fab variant="contained" color="primary" onClick={toggleChat} sx={{ borderRadius: "50%" }}>
          <ChatIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Chatbot;
