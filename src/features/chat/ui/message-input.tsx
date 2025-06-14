import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface MessageInputProps {
  disabled: boolean;
  onSendMessage: (text: string) => void;
}

export const MessageInput = ({
  disabled,
  onSendMessage,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  function handleSendMessage() {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  }

  function handlePressEnter(e: KeyboardEvent) {
    if (!disabled && e.key === "Enter") handleSendMessage();
  }

  return (
    <div className="flex items-center gap-3 px-6 py-4 bg-white border-t border-gray-100">
      <div className="bg-gray-100 rounded-lg flex-1 flex items-center shadow-inner pl-2 pr-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-0 h-10 bg-transparent focus:ring-0 text-gray-900 placeholder-gray-400"
          placeholder="Напишите ваше сообщение…"
          onKeyDown={handlePressEnter}
        />
      </div>
      <Button
        disabled={disabled}
        onClick={handleSendMessage}
        className="flex items-center justify-center text-black transition shadow-md"
        variant="ghost"
        size="icon"
      >
        <Send size={22} />
      </Button>
    </div>
  );
};
