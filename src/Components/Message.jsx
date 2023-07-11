import { Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack
      bg={"gray.200"}
      alignSelf={user === "me" ? "flex-end" : "flex-start"}
      color={"black"}
      paddingX={"2"}
      paddingY={"2"}
      borderRadius={"7"}
    >
      {user === "other" && <Avatar src={uri} />}
      <Text>{text}</Text>

      {user === "me" && <Avatar src={uri} />}
    </HStack>
  );
};

export default Message;
