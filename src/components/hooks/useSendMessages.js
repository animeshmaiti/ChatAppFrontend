import { useState } from "react";
import useConversation from "./useConversation"
import toast from "react-hot-toast";


export const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const apiUrl = import.meta.env.VITE_API_URL;
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading }
}
