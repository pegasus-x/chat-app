import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket: socket });

    // FIXED: Added proper event listeners and error handling
    socket.on("getOnlineUsers", (userIds) => {
      console.log("📡 Received online users from server:", userIds);
      
      // Ensure userIds is an array and has valid data
      if (Array.isArray(userIds)) {
        set({ onlineUsers: userIds });
        console.log("✅ Updated onlineUsers in store:", userIds);
      } else {
        console.warn("⚠️ Invalid userIds received:", userIds);
        set({ onlineUsers: [] });
      }
    });

    // ADDED: Connection event handlers for debugging
    socket.on("connect", () => {
      console.log("🔗 Socket connected successfully");
      console.log("Socket ID:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
      // Clear online users when disconnected
      set({ onlineUsers: [] });
    });

    // ADDED: Handle reconnection
    socket.on("reconnect", () => {
      console.log("🔄 Socket reconnected");
    });

    socket.on("reconnect_error", (error) => {
      console.error("❌ Socket reconnection error:", error);
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
      
      // Clear online users when disconnecting
      set({ onlineUsers: [], socket: null });
    }
  },
}));
