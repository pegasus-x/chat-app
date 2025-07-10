import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  searchResults: [],
isSearchingUsers: false,

// Add action:
searchUsers: async (query) => {
  if (!query) return set({ searchResults: [] });
  set({ isSearchingUsers: true });
  try {
    const res = await axiosInstance.get(`/messages/search-users?query=${query}`);
    set({ searchResults: res.data });
  } catch (err) {
    toast.error("Search failed");
  } finally {
    set({ isSearchingUsers: false });
  }
},

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });

      // ✅ Emit message-read when opening chat
      const lastMessage = res.data[res.data.length - 1];
      const { authUser, socket } = useAuthStore.getState();

      if (lastMessage?.receiverId === authUser._id && lastMessage?.status !== "read") {
        socket.emit("message-read", {
          messageId: lastMessage._id,
          senderId: lastMessage.senderId,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { socket, authUser } = useAuthStore.getState();

    socket.on("newMessage", (newMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isFromSelectedUser) return;

      // ✅ Emit message-delivered to server
      socket.emit("message-delivered", { messageId: newMessage._id });

      set({
        messages: [...get().messages, newMessage],
      });
    });

    // ✅ Listen for read events to update local state
    socket.on("message-read", ({ messageId }) => {
      const updatedMessages = get().messages.map((msg) =>
        msg._id === messageId ? { ...msg, status: "read" } : msg
      );
      set({ messages: updatedMessages });
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
    socket.off("message-read");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
