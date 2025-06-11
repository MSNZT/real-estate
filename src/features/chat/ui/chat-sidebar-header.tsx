"use client";
import { Input } from "@/shared/ui";
import { Search } from "lucide-react";

export const ChatSidebarHeader = () => {
  return (
    <div className="px-4">
      <h1 className="mb-2 font-medium text-2xl">Чаты</h1>
      <div className="relative px-4 bg-gray-100 rounded-lg mb-4">
        <Input
          placeholder="Введите имя"
          className="border-0 bg-transparent"
          // value={message}
          onChange={(e) => console.log(e.target.value)}
        />
        <Search
          size={12}
          className="absolute top-1/2 -translate-y-1/2 left-2 stroke-gray-500"
        />
      </div>
    </div>
  );
};
