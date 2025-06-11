import { useCallback, useState } from "react";
import { ThumnailsList } from "./ThumnailsList";

interface ImageGalleryProps {
  mainPhoto: string;
  photos: string[];
}

export const ImageGallery = ({ mainPhoto, photos }: ImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [mainPhoto, ...photos];

  const handleClickImage = useCallback(
    (index: number) => {
      setActiveImage(index);
    },
    [images]
  );

  return (
    <div className="flex flex-col max-w-[744px] mx-auto lg:mx-0 w-full mb-4">
      <div className="-mx-5 md:hidden">
        <ul className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-5 px-5 mb-4">
          {images.map((image, i) => (
            <img
              key={i}
              className="max-w-[500px] h-[260px] md:h-[300px] rounded-lg object-cover snap-start"
              src={image}
              alt={`Фото объявления № ${i + 1}`}
            />
          ))}
        </ul>
      </div>
      <div className="hidden md:block">
        <div className="mb-4">
          <img
            className="w-full h-[300px] md:h-[500px] rounded-lg object-cover"
            src={images[activeImage]}
            alt="Главное фото объявления"
          />
        </div>
        <ThumnailsList
          images={images}
          handleClickImage={handleClickImage}
          activeImageIndex={activeImage}
        />
      </div>
    </div>
  );
};
