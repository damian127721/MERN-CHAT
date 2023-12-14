import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/authentication/SideDrawer";
import MyChats from "../components/authentication/MyChats";
import ChatBox from "../components/authentication/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && (
        <>
          <SideDrawer />
          <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            h="91.5vh"
            p="10px"
          >
            {user && (
              <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
            {user && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default ChatPage;
