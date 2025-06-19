"use client";
import { CheckCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/shared/services/chat.service";
import Link from "next/link";
import { Skeleton } from "@/shared/ui";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { useOnline } from "@/shared/hooks/use-online";
import { useOnlineStore } from "@/shared/hooks/use-online-store";
import { useEffect } from "react";
import { useSocket } from "@/app/providers/SocketProvider";

export const ChatList = () => {
  const pathname = usePathname();
  const id = pathname.split("/").at(-1);
  const { isPending, data: chatList } = useQuery({
    queryKey: ["chat", "list"],
    queryFn: chatService.getChatList,
  });
  const companiosIds = chatList?.map((chat) => chat.companion.id) || [];
  useOnline(companiosIds);
  const onlineMap = useOnlineStore((state) => state.onlineMap);
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket?.on("newMessage", (data) => console.log(data));
  }, [socket]);

  return (
    <ul className="flex flex-col gap-3 overflow-y-auto">
      {isPending ? (
        <div className="px-4">
          <div className="flex gap-3 items-center p-2">
            <div>
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex justify-between items-center">
                <Skeleton className="w-28 h-3" />
                <Skeleton className="w-10 h-3" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="w-28 h-3" />
                <Skeleton className="w-10 h-3" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        chatList &&
        chatList.length > 0 &&
        chatList?.map((item) => (
          <li
            key={item.chatId}
            className={cn(
              "px-4 hover:bg-blue-100 transition-colors duration-300 ",
              { "bg-blue-100": item.chatId === id }
            )}
          >
            <Link
              className="flex gap-3 items-center w-full p-2"
              href={`/chat/channel/${item.chatId}`}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full h-9 w-9 bg-blue-400 relative after:absolute after:w-2 after:h-2 after:bg-gray-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white",
                  {
                    "after:bg-green-400": onlineMap[item.companion.id],
                  }
                )}
              >
                <span className="text-white font-medium">
                  {item.companion.name[0]}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm font-medium truncate">
                    {item.companion.name}
                  </p>
                  <p className="text-xs">
                    {item.lastMessage?.createdAt &&
                      Intl.DateTimeFormat("ru-RU", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(item.lastMessage.createdAt))}
                  </p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  {item.lastMessage?.text && (
                    <>
                      <p className="text-sm text-gray-400 truncate">
                        {item.lastMessage?.text}
                      </p>
                      {/* Доделать */}
                      {onlineMap[item.companion.id] ? (
                        <CheckCheck
                          className="stroke-green-600 shrink-0"
                          size={13}
                        />
                      ) : (
                        <CheckCheck
                          className="stroke-gray-600 shrink-0"
                          size={13}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))
      )}
      {/* <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">How are you doing?</p>
            <CheckCheck className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2 rounded-lg cursor-pointer bg-green-50 border-l-4 border-green-500">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-green-600 truncate">… is typing</p>
            <CheckCheck className="stroke-white shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2 rounded-lg cursor-pointer bg-blue-200 border-l-4 border-sky-500">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-sky-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-sky-600 truncate">… is typing</p>
            <CheckCheck className="stroke-white shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">Kate Rose</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-400 truncate">
              you: See you tomorrow!
            </p>
            <Check className="stroke-green-600 shrink-0" size={13} />
          </div>
        </div>
      </li>
      <li className="flex gap-3 items-center w-full p-2">
        <div className="rounded-full h-9 w-9 bg-black relative after:absolute after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:bottom-1 after:right-0 after:border after:border-white"></div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm font-medium truncate">Robert Parker</p>
            <p className="text-xs">16:45</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-black truncate">Awesome!</p>
            <p className="text-white bg-green-600 rounded-full w-4 h-4 text-xs align-middle text-center">
              2
            </p>
          </div>
        </div>
      </li> */}
    </ul>
  );
};
