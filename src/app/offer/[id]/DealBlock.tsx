import { AdTypes, Deal } from "@/shared/config/apollo/generated";
import { Fragment, JSX } from "react";
import { BargainItem } from "./deal-block/BargainItem";
import { DepositItem } from "./deal-block/DepositItem";
import { AgentFeeItem } from "./deal-block/AgentFeeItem";
import { UtilitiesFeeItem } from "./deal-block/UtilitiesFeeItem";
import { Separator } from "@/shared/ui";
import { getPrettyPrice } from "@/shared/utils/getPrettyPrice";

interface DealBlockProps {
  deal: Deal;
  adType: AdTypes;
}

export const DealBlock = ({ deal, adType }: DealBlockProps) => {
  const fieldsArray = Object.entries(deal.fields) as [string, string][];

  const obj: Record<string, (props: { value: string }) => JSX.Element> = {
    bargain: BargainItem,
    deposit: DepositItem,
    agentFee: AgentFeeItem,
    utilitiesFee: UtilitiesFeeItem,
  };

  return (
    <>
      <ul className="flex flex-col gap-1 text-sm mb-3">
        {fieldsArray.map(([key, value]) => (
          <Fragment key={key}>{obj[key]({ value })}</Fragment>
        ))}
      </ul>

      {adType !== AdTypes.RentShort && (
        <>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-bold">Итого</p>
            <p className="font-bold">{getPrettyPrice(deal.price)}</p>
          </div>
        </>
      )}
    </>
  );
};
