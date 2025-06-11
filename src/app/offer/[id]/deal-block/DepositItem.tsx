export const DepositItem = ({ value }: { value: string }) => {
  return (
    <div className="flex items-center justify-between">
      <p>Залог</p>
      <p className="bg-gray-100 rounded-md max-w-13 h-5 text-sm px-1 font-medium">
        {value}
        <span className="text-xs">%</span>
      </p>
    </div>
  );
};
