"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button, Container } from "@/shared/ui";
import type { Ad } from "@/shared/config/apollo/generated/types";
import { getAdTitle } from "@/entities/ad/utils/getAdTitle";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { BookingWidget } from "@/features/Booking";
import dynamic from "next/dynamic";

interface ProductProps {
  product: Ad;
}

export const Product = ({ product }: ProductProps) => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showTel, setShowTel] = useState(false);

  const photos = [product.mainPhoto, ...product.photos];
  const title = getAdTitle(product);
  const period = getDealPeriod(product);
  const price = getPrettyPrice(product.deal.price);
  const center = [product.location.latitude, product.location.longitude];
  const createAt = Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(product.createdAt));

  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  // const url = window.location.href;

  // function copyLinkPage(url: string) {
  //   window.navigator.clipboard.writeText(url);
  // }

  return (
    <Container>
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-y-3 lg:gap-x-8 w-full mt-5">
        <div className="flex flex-col gap-1 font-medium w-full order-2 lg:order-none">
          <h2 className="text-xl md:text-2xl lg:text-3xl ">{title}</h2>
          <p className="text-lg">
            {price + " "}
            {period}
          </p>
        </div>
        <div className="flex flex-col max-w-[500px] lg:max-w-[60%] mx-auto lg:mx-0 w-full order-1 lg:order-none">
          <div className="mb-4 lg:mb-0">
            <img
              className="w-full h-[300px] md:h-[500px] rounded-lg object-cover"
              src={photos[activePhoto]}
              alt={`Фото ${title}`}
            />
            <ul className="flex items-center gap-3">
              {photos.map((photo, i) => (
                <li
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className="cursor-pointer"
                >
                  {/* <img
                  src={photo}
                  alt={`Фото объявления № ${i + 1}`}
                  className={cn(
                    "w-[75px] h-[55px]",
                    activePhoto === i && "outline outline-primary"
                  )}
                /> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className="lg:sticky top-3 self-start mt-4 lg:mt-14 flex-1"> */}
        {/* <div className="flex items-center justify-between mb-1 transform-"> */}
        {/* <p className="text-slate-400">
              {createAt}
            </p> */}
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full shadow-md" variant="white">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl px-0" align="end">
              <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                <Button
                  className="flex items-center gap-1 text-base font-medium"
                  variant="ghost"
                  size="clear"
                >
                  <Heart size="50px" className="fill-red-500 stroke-none" />
                  <span>Добавить в избранное</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-cente gap-1 px-4 py-3 cursor-pointer">
                <ThumbsDown />
                <span className="text-base font-medium">
                  Пожаловаться на объявление
                </span>
              </DropdownMenuItem>
              <hr className="mt-3 mb-3" />
              <h3 className="px-4 font-semibold text-xl">Поделиться</h3>
              <div>
                <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                  <a
                    className="flex items-center gap-2"
                    href={`https://vk.com/share.php?url=${url}`}
                    rel="noopener noreferrer"
                  >
                    <Icon Svg={VkIcon} fill="#0077FF" />
                    <span className="text-base">Вконтакте</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                  <a
                    className="flex items-center gap-2"
                    href={`https://t.me/share/url?url=${url}`}
                    rel="noopener noreferrer"
                  >
                    <Icon Svg={TgIcon} />
                    <span className="text-base">Телеграм</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 cursor-pointer">
                  <Button
                    className="font-medium text-base"
                    // onClick={() => copyLinkPage(url)}
                    variant="ghost"
                    size="clear"
                  >
                    <Copy />
                    <span>Скопировать ссылку</span>
                  </Button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}
        {/* </div> */}
        <div className="order-3 lg:order-none flex-1 max-w-[400px] basis-1/3">
          <BookingWidget price={product.deal.price} adId={product.id} />
        </div>
        {/* <p className="font-bold text-2xl">
            {price} {period}
          </p>
          <ul className="flex flex-col gap-1 text-sm mb-3">
            <li>
              <div className="flex items-center justify-between">
                <span>Залог</span>
                <span>есть</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2">
                  Комиссия агенту
                  <span className="bg-slate-200 p-1 rounded text-xs"> 0%</span>
                </p>
                <span>0 ₽</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Коммунальные услуги</span>
                <span>включены в стоимость</span>
              </div>
            </li>
          </ul>
          <hr />
          <div className="flex items-center gap-5 justify-between mt-2 font-semibold text-xl">
            <span>Итого</span>
            <span>{price} + залог</span>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* <BookingButton adId={product.id} /> */}
        {/* <Button
              onClick={() => setShowTel(true)}
              className="bg-gray-200 text-md"
              variant="ghost"
            >
              {showTel ? (
                <a href="tel:79338765645">+79338765645</a>
              ) : (
                <span>Показать телефон</span>
              )}
            </Button>
            <Button className="bg-gray-200 text-md" variant="ghost">
              Написать
            </Button>
          </div> */}
        {/* </div> */}
        <div className="order-4 lg:order-none">
          <div className="mt-5">
            <p className="font-bold text-2xl mb-2">О квартире</p>
            <ul className="grid grid-cols-3 gap-3">
              <li className="flex flex-col gap-2">
                {/* <p className="text-xl">{product.area} м&#178;</p> */}
                <span className="text-slate-500 font-normal">общая</span>
              </li>
              <li className="flex flex-col gap-2">
                {/* <p className="text-xl">{product.floor} этаж</p> */}
                <span className="text-slate-500 font-normal">
                  {/* из {product.totalFloors} */}
                </span>
              </li>
              <li className="flex flex-col gap-2">
                {/* <p className="text-xl">{product.yearBuilt} год</p> */}
                <span className="text-slate-500 font-normal">
                  год постройки
                </span>
              </li>
            </ul>

            <hr className="my-4" />
            {/* <ul className="grid grid-cols-3 gap-3">
            {product.amenities.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <AmenityIcon name={item.name} />
                <span className="text-lg font-normal">{item.name}</span>
              </li>
            ))}
          </ul> */}
          </div>

          {/* <div className="mt-5">
            <p className="font-bold text-2xl mb-2">Описание</p>
            <p>
              {showDescription
                ? product.description
                : product.description.slice(0, 300)}
            </p>
            {product.description.length >= 300 && (
              <Button
                onClick={() => setShowDescription((prev) => !prev)}
                className="flex items-center gap-2 text-[#3393d4] hover:text-[#4e8ce8] font-normal text-md"
                size="clear"
                variant="ghost"
              >
                {showDescription ? (
                  <>
                    <span>Свернуть описание</span> <ChevronUp />
                  </>
                ) : (
                  <>
                    <span>Показать полностью</span>
                    <ChevronDown />
                  </>
                )}
              </Button>
            )}
          </div> */}

          <div className="mt-5">
            <p className="font-bold text-2xl mb-5">Расположение</p>
            {/* <MapComponent center={location} zoom={17} /> */}
            {/* <YMaps query={{ apikey: "551d826c-1a13-4de5-9eba-b5ac8eecaa4b" }}>
              <Map
                className="rounded-lg overflow-hidden"
                style={{ width: "100%", height: "300px" }}
                defaultState={{ center, zoom: 17 }}
                options={{
                  yandexMapDisablePoiInteractivity: true,
                }}
              >
                <Placemark geometry={center} />
                <ZoomControl />
              </Map>
            </YMaps> */}
          </div>
        </div>
      </div>
    </Container>
  );
};
