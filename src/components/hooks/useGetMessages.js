import { useEffect, useState } from "react";
import useConversation from "./useConversation";
import toast from "react-hot-toast";

export const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    const apiUrl = import.meta.env.VITE_API_URL;
    const getMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/messages/${selectedConversation._id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation._id,setMessages]);
    return {loading,messages};
}
