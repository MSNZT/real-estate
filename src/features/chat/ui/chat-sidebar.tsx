import { ChatList } from "./chat-list";
import { ChatSidebarHeader } from "./chat-sidebar-header";

export const ChatSidebar = () => {
  return (
    <aside className="flex flex-col md:w-[340px] min-w-[280px] w-full h-full md:max-w-[400px] md:border-x border-gray-200 py-6 px-0">
      <ChatSidebarHeader />
      <ChatList />
    </aside>
  );
};
