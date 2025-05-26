import { useCallback, useState } from "react";
import { ThumnailsList } from "./ThumnailsList";
import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";

interface ImageGalleryProps {
  mainPhoto: string;
  photos: string[];
}

export const ImageGallery = ({ mainPhoto, photos }: ImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [mainPhoto, ...photos];
  const isMobile = useClientMediaQuery({ maxWidth: 1024 });

  const handleClickImage = useCallback(
    (index: number) => {
      setActiveImage(index);
    },
    [images]
  );

  if (isMobile) {
    return (
      <div className="-mx-5">
        <ul className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-5 px-5 mb-4">
          {images.map((image, i) => (
            <img
              key={i}
              className="w-full h-[260px] md:h-[500px] rounded-lg object-cover snap-start"
              src={image}
              alt={`Фото объявления № ${i + 1}`}
            />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-[744px] mx-auto lg:mx-0 w-full mb-4">
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
  );
};
