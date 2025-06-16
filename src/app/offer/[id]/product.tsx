"use client";
import { Container, Loader, Skeleton } from "@/shared/ui";
import { AdTypes, type Ad } from "@/shared/config/apollo/generated";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { BookingWidget } from "@/features/booking";
import { ImageGallery } from "./ImageGallery";
import { AdTitle } from "./AdTitle";
import { ContactBlock } from "./ContactBlock";
import { DealBlock } from "./DealBlock";
import { AboutPropertyBlock } from "./about-block/AboutPropertyBlock";
import { AdUserMenu } from "./AdUserMenu";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { FeaturesBlock } from "./FeaturesBlock";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { API_KEY_MAP } from "@/shared/config/environment";
import { Booking } from "@/widgets/booking";
import { getPrettyPrice } from "@/shared/utils/getPrettyPrice";

interface ProductProps {
  product: Ad;
}

export const Product = ({ product }: ProductProps) => {
  const period = getDealPeriod(product);
  const price = getPrettyPrice(product.deal.price);
  const center = [product.location.latitude, product.location.longitude];
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [mapIsLoading, setMapIsLoading] = useState(true);

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

  return (
    <Container className="relative mt-5 mb-[80px]">
      <AdUserMenu id={product.id} title={product.title} />
      <div className="flex flex-col lg:flex-row lg:gap-y-3 lg:gap-x-8 w-full mt-5">
        <ImageGallery photos={product.photos} mainPhoto={product.mainPhoto} />
        <div className="flex flex-col gap-3 max-w-[400px] w-full lg:shrink-0">
          <AdTitle title={product.title} price={price} period={period} />
          <DealBlock deal={product.deal} adType={product.adType} />
          {product.adType === AdTypes.RentShort && (
            // <BookingWidget price={product.deal.price} adId={product.id} />
            <Booking adId={product.id} price={product.deal.price} />
          )}

          <ContactBlock ownerId={product.owner.id} contact={product.contact} />
        </div>
      </div>
      <FeaturesBlock features={product.features} />
      <AboutPropertyBlock
        propertyDetails={product.propertyDetails}
        propertyType={product.propertyType}
        description={product.description}
      />
      <div ref={ref}>
        {inView && (
          <>
            {mapIsLoading && (
              <Skeleton className="w-full h-[300px] rounded-2xl bg-gray-200" />
            )}
            <YMaps query={{ apikey: API_KEY_MAP }}>
              <Map
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                }}
                defaultState={{ center: center, zoom: 14 }}
                onLoad={() => setMapIsLoading(false)}
              >
                <Placemark
                  geometry={center}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref: "/pin.svg",
                    iconImageSize: [40, 40],
                    iconImageOffset: [-15, -15],
                  }}
                  properties={{
                    hintContent: "Кастомный маркер",
                    balloonContent: "Описание маркера",
                  }}
                />
              </Map>
            </YMaps>
          </>
        )}
      </div>
    </Container>
  );
};
