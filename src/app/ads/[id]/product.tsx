"use client";
import { Container } from "@/shared/ui";
import { AdTypes, type Ad } from "@/shared/config/apollo/generated";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { BookingWidget } from "@/features/Booking";
import { ImageGallery } from "./ImageGallery";
import { AdTitle } from "./AdTitle";
import { ContactBlock } from "./ContactBlock";
import { DealBlock } from "./DealBlock";
import { AboutPropertyBlock } from "./about-block/AboutPropertyBlock";
import { AdUserMenu } from "./AdUserMenu";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { FeaturesBlock } from "./FeaturesBlock";

interface ProductProps {
  product: Ad;
}

export const Product = ({ product }: ProductProps) => {
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

  return (
    <Container className="relative mt-5 mb-[80px]">
      <AdUserMenu title={product.title} />
      <div className="flex flex-col lg:flex-row lg:gap-y-3 lg:gap-x-8 w-full mt-5">
        <ImageGallery photos={product.photos} mainPhoto={product.mainPhoto} />
        <div className="flex flex-col gap-3 max-w-[400px] w-full lg:shrink-0">
          <AdTitle title={product.title} price={price} period={period} />
          <DealBlock deal={product.deal} adType={product.adType} />
          {product.adType === AdTypes.RentShort && (
            <BookingWidget price={product.deal.price} adId={product.id} />
          )}

          <ContactBlock contact={product.contact} />
        </div>
      </div>
      <FeaturesBlock features={product.features} />
      <AboutPropertyBlock
        propertyDetails={product.propertyDetails}
        propertyType={product.propertyType}
        description={product.description}
      />
      <YMaps query={{ apikey: process.env.API_KEY_MAP }}>
        <Map
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
          }}
          defaultState={{ center: center, zoom: 14 }}
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
    </Container>
  );
};
