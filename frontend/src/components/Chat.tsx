import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../zustand/store'; // Adjust the import according to your file structure

interface Message {
  _id: string;
  user: { id: string; name: string } | null;
  room: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const user = useUserStore((state) => state.user);
  const roomId = "67254646ce7f3cf149dd08bc"; // Use the appropriate room ID here

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/messages/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Prevent sending empty messages
    if (!user) {
      console.error('User is not logged in');
      return; // Prevent sending if user is not authenticated
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/messages/${roomId}`, {
        user: user.id, // Make sure user.id is valid
        message: newMessage,
      });
      setMessages((prev) => [...prev, response.data.newMessage]); // Add the new message to the state
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4">
        <h2 className="text-3xl text-red-800 mb-4">Chat</h2>
        <div className="border-t border-gray-300 pt-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`my-2 p-2 rounded ${msg.user?.id === user?.id ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}>
              <strong>{msg.user?.name || 'Unknown User'}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="border rounded w-full px-2 py-1"
            required
          />
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-1 mt-2">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
