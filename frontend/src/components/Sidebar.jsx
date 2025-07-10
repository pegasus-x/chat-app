import { useEffect, useState } from "react";
 import { useChatStore } from "../store/useChatStore";
 import { useAuthStore } from "../store/useAuthStore";
 import SidebarSkeleton from "./skeletons/SidebarSkeleton";
 import { Users } from "lucide-react";
import { debounce } from "lodash";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    searchResults,
    searchUsers,
    isSearchingUsers,
  } =useChatStore();

  const [query, setQuery] = useState("");
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const debouncedSearch = debounce((value) => searchUsers(value), 400);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    debouncedSearch(val);
  };

  const displayedUsers = query.trim()
    ? searchResults
    : showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="input input-sm mt-3 w-full hidden lg:block"
        />

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {isSearchingUsers ? (
          <div className="text-center text-zinc-400">Searching...</div>
        ) : displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-400 py-3">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
