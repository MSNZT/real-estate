import { cn } from "@/shared/lib/utils";

interface ThumnailsListProps {
  images: string[];
  handleClickImage: (index: number) => void;
  activeImageIndex: number;
}

export const ThumnailsList = ({
  images,
  handleClickImage,
  activeImageIndex,
}: ThumnailsListProps) => {
  return (
    <ul className="flex items-center gap-3 flex-wrap">
      {images?.map((photo, i) => (
        <li
          key={i}
          onClick={() => handleClickImage(i)}
          className="cursor-pointer"
        >
          <img
            src={photo}
            alt={`Фото объявления № ${i + 1}`}
            className={cn(
              "w-[75px] h-[55px] rounded-lg",
              activeImageIndex === i && "outline-2 outline-primary"
            )}
          />
        </li>
      ))}
    </ul>
  );
};
