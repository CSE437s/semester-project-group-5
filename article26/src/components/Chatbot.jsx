// Chatbot.js
// https://deepchat.dev/
import React, { useState, useEffect } from "react";
import { Fab, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { DeepChat } from "deep-chat-react";
import { useAsyncError, useLocation } from "react-router-dom";
import { supabase } from "../supabase";

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resultsData, setResultsData] = useState();
  const toggleChat = () => setIsOpen(!isOpen);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/home/quiz";
  const initialMessages = [
    {
      role: "ai",
      text: "Hey, I'm Beri, your personal financial assistant! What can I help you with today?",
    },
  ];

  useEffect(() => {
    async function fetchResponses() {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting user:", sessionError.message);
        return;
      }
      const uid = data.session.user.id;
      const { data: responsesData, error } = await supabase
        .from("Responses")
        .select("factorScores, phenotype")
        .eq("userID", uid);

      if (error) {
        console.error("Error fetching responses:", error.message);
        return;
      }
      setResultsData(JSON.stringify(responsesData));
      //console.log(resultsData);
    }

    fetchResponses();
  }, []); // Empty dependency array to ensure it runs only once after the component mounts

  const systemContextPrompt =
    "Take on the role of Beri, my personal digital financial advisor. Advise me based on my financial phenotype, obtained from the results of my phenotype test. Here are my test results and phenotype for your reference. " +
    resultsData;

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
                systemPrompt={systemContextPrompt}
                directConnection={{
                  openAI: {
                    key: openAIKey,
                    chat: { model: "gpt-3.5-turbo" },
                  },
                }}
                style={{ borderRadius: "10px" }}
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
