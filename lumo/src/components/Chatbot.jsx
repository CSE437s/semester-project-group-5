// Chatbot.js
// https://deepchat.dev/
import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { DeepChat } from "deep-chat-react";
import { useLocation } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const initialMessages = [
    {
      role: "ai",
      text: "Hey, I'm Beri, your personal financial assistant! What can I help you with today?",
    },
  ];

  return (
    !isLoginPage && (
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
            <div>
              <DeepChat
                demo={true}
                style={{ borderRadius: "10px" }}
                textInput={{ placeholder: { text: "Welcome to the demo!" } }}
                initialMessages={initialMessages}
              />
            </div>
            <div>
              <Fab
                variant="contained"
                onClick={toggleChat}
                sx={{ borderRadius: "50%", backgroundColor: "#e00000" }}
              >
                <CloseIcon sx={{ color: "white" }} />
              </Fab>
            </div>
          </>
        ) : (
          <Fab
            variant="contained"
            color="primary"
            onClick={toggleChat}
            sx={{ borderRadius: "50%" }}
          >
            <ChatIcon />
          </Fab>
        )}
      </Box>
    )
  );
};

export default Chatbot;
