import { cn } from "@/shared/lib/utils";
import { CheckCheck } from "lucide-react";

interface ChatMessageProps {
  text: string;
  createdAt: string;
  isRight: boolean;
}

export const ChatMessage = ({ text, createdAt, isRight }: ChatMessageProps) => {
  return (
    <div
      className={cn("bg-gray-100", {
        "self-end rounded-t-lg rounded-bl-lg": isRight,
        "self-start rounded-b-lg rounded-tr-lg": !isRight,
      })}
    >
      <div
        className={cn("flex flex-col p-3 max-w-[400px]", {
          "items-end": isRight,
        })}
      >
        <p className="text-sm">{text}</p>
        <div className="flex items-center gap-2">
          {isRight && <CheckCheck size={12} className="stroke-green-600" />}
          <p className="text-xs text-gray-400">
            {Intl.DateTimeFormat("ru-RU", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};
