export const BargainItem = ({ value }: { value: string }) => {
  return (
    <div className="flex items-center justify-between">
      <p>Торг</p>
      <p className="bg-gray-100 rounded-md max-w-13 h-5 text-sm px-1 font-medium">
        {value ? "Есть" : "Нет"}
      </p>
    </div>
  );
};
