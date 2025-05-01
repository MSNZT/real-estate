export const AdCardImage = ({ mainPhoto }: { mainPhoto: string }) => {
  return (
    <div className="relative h-[200px] rounded-lg overflow-hidden mb-2">
      <img
        className="h-full w-full object-cover"
        src={mainPhoto}
        alt="фото недвижимости"
      />
    </div>
  );
};
