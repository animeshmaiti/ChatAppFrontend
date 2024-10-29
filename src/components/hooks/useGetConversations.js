import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/users/conversations`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message || "An error occurred");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    }, []);
    return { loading, conversations,setConversations};
}

export const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/users`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error);
                }
                setUsers(data);
            } catch (error) {
                toast.error(error.message || "An error occurred");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, []);
    return { loading, users};
}

