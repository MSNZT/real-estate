"use client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Message } from "../types/chat-list.types";
import { ChatMessage } from "./chat-message";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useVirtualizer } from "@tanstack/react-virtual";
import { measureMessageHeight } from "./measureMessageHeight";
import { useInView } from "react-intersection-observer";

interface MessageListProps {
  messages: Message[];
  userId: string | undefined;
  chatId: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const MessageList = ({
  messages,
  userId,
  chatId,
  setMessages,
}: MessageListProps) => {
  const [triggerRef, inView] = useInView();
  const { fetchNextPage, hasNextPage, isFetched, isFetching } =
    useInfiniteQuery({
      queryKey: ["chat"],
      queryFn: async ({ pageParam }) => {
        console.log("pageParams", pageParam);

        const { data } = await $apiWithAuth.get(
          `/chat/${chatId}/messages?limit=10${pageParam ? `&cursor=${pageParam}` : ""}`
        );
        setMessages((prev) => [...data.messages.reverse(), ...prev]);
        return data;
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!chatId,
      refetchOnWindowFocus: false,
    });
  const parentRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const loadingMore = useRef(false);

  const getMessageHeight = (index: number) => {
    const msg = messages[index];
    return measureMessageHeight(msg.text, {
      maxWidth: 300,
      padding: 12,
      fontSize: 14,
      lineHeight: 20,
    });
  };

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: getMessageHeight,
    overscan: 10,
  });

  // useLayoutEffect(() => {
  //   if (rowVirtualizer && messages.length) {
  //     rowVirtualizer.scrollToIndex(messages.length - 1, { align: "end" });
  //     setReady(true);
  //   }
  // }, [messages.length]);

  // useLayoutEffect(() => {
  //   if (!parentRef.current) return;
  //   if (isFirstLoadRef.current) {
  //     rowVirtualizer.scrollToIndex(messages.length - 1, { align: "end" });
  //     setReady(true);
  //     isFirstLoadRef.current = false;
  //   } else {
  //     const currHeight = parentRef.current.scrollHeight;
  //     parentRef.current.scrollTop = currHeight - prevHeightRef.current;
  //   }
  // }, [messages.length]);

  // const fetchNextPageWithScroll = async () => {
  //   if (parentRef.current) {
  //     prevHeightRef.current = parentRef.current.scrollHeight;
  //   }
  //   await fetchNextPage();
  // };

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPageWithScroll();
  //   }
  // }, [inView, hasNextPage]);

  useLayoutEffect(() => {
    if (
      !firstLoaded &&
      parentRef.current &&
      messages.length > 0 &&
      isFetched &&
      !isFetching
    ) {
      rowVirtualizer.scrollToIndex(messages.length - 1, { align: "end" });
      setFirstLoaded(true);
    }
  }, [messages.length, isFetched, isFetching]);

  useLayoutEffect(() => {
    if (firstLoaded && prevScrollHeight.current && parentRef.current) {
      const diff = parentRef.current.scrollHeight - prevScrollHeight.current;
      if (diff > 0) {
        parentRef.current.scrollTop += diff;
      }
    }
  }, [messages.length]);

  const fetchNextPageWithScroll = async () => {
    if (loadingMore.current) return; // блокируем если уже грузим
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
      className="px-4 pt-4"
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        position: "relative",
        // opacity: ready ? 1 : 0,
        // transition: "opacity 0.1s",
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {/* <div ref={triggerRef} style={{ height: 1 }} /> */}
        {/* {firstLoaded && <div ref={triggerRef} style={{ height: 1 }} />} */}
        {firstLoaded && !isFetching && !loadingMore.current && (
          <div ref={triggerRef} style={{ height: 1 }} />
        )}
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const msg = messages[virtualRow.index];
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
