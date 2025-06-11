import { Fragment, ReactNode, useCallback, useState } from "react";
import { AdContact } from "@/shared/config/apollo/generated";
import { Button } from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { $apiWithAuth } from "@/shared/api/lib/axios";
import { useRouter } from "next/navigation";

type CommunicationType = "calls-only" | "calls-and-message" | "message-only";

interface ContactBlockProps {
  contact: AdContact;
  ownerId: string;
}

export const ContactBlock = ({ contact, ownerId }: ContactBlockProps) => {
  const [showTel, setShowTel] = useState(false);
  const communication = contact.communication as CommunicationType;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      $apiWithAuth.post("/chat/join", {
        userId: ownerId,
      }),
    onSuccess: ({ data }) => {
      router.push(`/chat/channel/${data}`);
    },
  });

  const renderMessageButton = useCallback(
    () => (
      <Button
        className="bg-gray-200 justify-center items-center h-10"
        variant="ghost"
        disabled={isPending}
        onClick={mutate}
      >
        <span className="font-semibold text-base">Написать</span>
      </Button>
    ),
    []
  );

  const renderPhoneButton = useCallback(
    () => (
      <Button
        onClick={() => setShowTel(true)}
        className="bg-gray-200 justify-center items-center h-10 hover:bg-gray-300 rounded-lg"
        variant="ghost"
      >
        {showTel ? (
          <a className="font-semibold" href={`tel:${contact.phone}`}>
            +{contact.phone}
          </a>
        ) : (
          <span className="font-semibold text-base">Показать телефон</span>
        )}
      </Button>
    ),
    [showTel]
  );

  const communicationVariants: Record<CommunicationType, ReactNode[]> = {
    "calls-and-message": [renderMessageButton(), renderPhoneButton()],
    "calls-only": [renderPhoneButton()],
    "message-only": [renderMessageButton()],
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      {communicationVariants[communication].map((variant, i) => (
        <Fragment key={i}>{variant}</Fragment>
      ))}
    </div>
  );
};
