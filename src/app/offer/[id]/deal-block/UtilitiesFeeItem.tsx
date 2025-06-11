type UtilitiesFeeType = "included" | "only-counters" | "whole-recepit";

export const UtilitiesFeeItem = ({ value }: { value: string }) => {
  const utilitiesFeeDictionary: Record<UtilitiesFeeType, string> = {
    included: "Включены в стоимость",
    "only-counters": "Только счётчики",
    "whole-recepit": "Вся квитанция",
  };
  return (
    <div className="flex items-center justify-between">
      <p>Коммунальные услуги</p>
      <p className="bg-gray-100 rounded-md max-w-50 h-5 text-sm px-1 font-medium">
        {utilitiesFeeDictionary[value as UtilitiesFeeType]}
      </p>
    </div>
  );
};
