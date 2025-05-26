import { Fragment, ReactNode, useCallback, useState } from "react";
import { AdContact } from "@/shared/config/apollo/generated";
import { Button } from "@/shared/ui";

type CommunicationType = "calls-only" | "calls-and-message" | "message-only";

interface ContactBlockProps {
  contact: AdContact;
}

export const ContactBlock = ({ contact }: ContactBlockProps) => {
  const [showTel, setShowTel] = useState(false);
  const communication = contact.communication as CommunicationType;

  const renderMessageButton = useCallback(
    () => (
      <Button
        className="bg-gray-200 justify-center items-center h-10"
        variant="ghost"
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
