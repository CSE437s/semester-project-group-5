import React, { useState } from "react";
import { Fab, Box, Typography, TextField, IconButton, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);
  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleSendMessage = () => {
    console.log(message); // Implement sending message
    setMessage(""); // Clear the input field after sending
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      {isOpen ? (
        <Box
          sx={{
            width: 300,
            height: 400,
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Typography variant="h6">Chat with us!</Typography>
            <Box>
              <IconButton onClick={toggleChat} sx={{ mr: 1 }}>
                <MinimizeIcon />
              </IconButton>
              <CloseIcon onClick={toggleChat} style={{ cursor: "pointer" }} />
            </Box>
          </Box>
          <Box sx={{ flex: 1, padding: "10px" }}>{/* Placeholder for chat messages */}</Box>
          <Box
            sx={{
              borderTop: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={handleMessageChange}
              onKeyPress={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  handleSendMessage();
                  event.preventDefault();
                }
              }}
            />
            <Button onClick={handleSendMessage} sx={{ ml: 1 }}>
              Send
            </Button>
          </Box>
        </Box>
      ) : (
        <Fab color="primary" onClick={toggleChat} sx={{ borderRadius: "50%" }}>
          <ChatIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Chatbot;
