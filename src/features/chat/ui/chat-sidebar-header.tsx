"use client";
import { Button, Input } from "@/shared/ui";
import { Search, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const ChatSidebarHeader = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  function handleQueryReset() {
    setQuery("");
  }
  return (
    <div className="px-4">
      <h1 className="mb-2 font-medium text-2xl">Чаты</h1>
      <div className="relative px-4 bg-gray-100 rounded-lg mb-4">
        <Input
          placeholder="Введите имя"
          className="border-0 bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
        <Search
          size={14}
          className="absolute top-1/2 -translate-y-1/2 left-2 stroke-gray-500"
        />
        {query.length > 0 && (
          <Button
            variant="clear"
            size="clear"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleQueryReset}
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
