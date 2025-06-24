"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Message, MessagesResponse } from "../types/chat-list.types";
import { ChatMessage } from "./chat-message";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { measureMessageHeight } from "./measureMessageHeight";
import { useInView } from "react-intersection-observer";
import { AxiosError } from "axios";

interface MessageListProps {
  messages: Message[];
  userId: string | undefined;
  infiniteQuery: UseInfiniteQueryResult<
    InfiniteData<MessagesResponse, unknown>,
    AxiosError<unknown, any>
  >;
}

export const MessageList = ({
  messages,
  userId,
  infiniteQuery,
}: MessageListProps) => {
  const [triggerRef, inView] = useInView();
  const parentRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const { fetchNextPage, isFetched, isFetching, hasNextPage } = infiniteQuery;

  const loadingMore = useRef(false);
  const sortedMessages = useMemo(() => {
    return messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  const getMessageHeight = (index: number) => {
    const msg = sortedMessages[index];
    return measureMessageHeight(msg.text, {
      maxWidth: 300,
      padding: 12,
      fontSize: 14,
      lineHeight: 20,
    });
  };

  const rowVirtualizer = useVirtualizer({
    count: sortedMessages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: getMessageHeight,
    overscan: 10,
  });

  useLayoutEffect(() => {
    if (
      !firstLoaded &&
      parentRef.current &&
      sortedMessages.length > 0 &&
      isFetched &&
      !isFetching
    ) {
      rowVirtualizer.scrollToIndex(sortedMessages.length - 1, { align: "end" });
      setFirstLoaded(true);
    }
  }, [sortedMessages.length, isFetched, isFetching]);

  useLayoutEffect(() => {
    if (firstLoaded && prevScrollHeight.current && parentRef.current) {
      const diff = parentRef.current.scrollHeight - prevScrollHeight.current;
      if (diff > 0) {
        parentRef.current.scrollTop += diff;
      }
    }
  }, [sortedMessages.length]);

  const fetchNextPageWithScroll = async () => {
    if (loadingMore.current) return;
    loadingMore.current = true;
    if (parentRef.current) {
      prevScrollHeight.current = parentRef.current.scrollHeight;
    }
    await fetchNextPage();
    loadingMore.current = false;
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && firstLoaded) {
      fetchNextPageWithScroll();
    }
  }, [inView, hasNextPage, isFetching, firstLoaded]);

  return (
    <div
      ref={parentRef}
      className="px-4 pt-4 flex flex-col justify-end"
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {firstLoaded && !isFetching && !loadingMore.current && (
          <div ref={triggerRef} style={{ height: 1 }} />
        )}
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const msg = sortedMessages[virtualRow.index];
          const isRight = msg.authorId === userId;
          return (
            <div
              key={msg.id}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
                display: "flex",
                justifyContent: isRight ? "flex-end" : "flex-start",
              }}
            >
              <ChatMessage {...msg} isRight={isRight} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
