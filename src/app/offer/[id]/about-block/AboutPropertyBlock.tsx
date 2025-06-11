import { Ad, AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";
import { useCallback, useState } from "react";
import { AdDescription } from "./AdDescription";

interface AboutPropertyBlockProps {
  propertyDetails: Ad["propertyDetails"];
  propertyType: PropertyTypes;
  description: Ad["description"];
}

const propertyDetailsDictionary: Record<string, string> = {
  bathroom: "Туалет",
  ceilingHeight: "Высота потолков (м)",
  floor: "Этаж",
  totalFloor: "Всего этажей",
  kitchenArea: "Кухня",
  livingArea: "Жилая зона",
  totalArea: "Общая площадь",
  renovation: "Ремонт",
  rooms: "Комнат",
  plotHouse: "Площадь дома",
  houseType: "Тип дома",
  houseMaterialType: "Материал дома",
  toilet: "Туалет",
  shower: "Душ",
};

const areaDetailsDictionary: Record<string, string> = {
  parkingType: "Парковка",
  yearBuilt: "Год постройки",
  plotArea: "Площадь участка",
  areaType: "Тип участка",
};

function getDetailsTitle(propertyType: PropertyTypes) {
  switch (propertyType) {
    case PropertyTypes.Apartment: {
      return ["О доме", "О квартире"];
    }
    case PropertyTypes.House: {
      return ["О территории", "О доме"];
    }
  }
}

export const AboutPropertyBlock = ({
  propertyDetails,
  propertyType,
  description,
}: AboutPropertyBlockProps) => {
  const [toggleDescription, setToggleDescription] = useState(false);
  const [areaTitle, propertyTitle] = getDetailsTitle(propertyType);

  const areaDetails = Object.entries(
    propertyDetails?.fields as [string, string]
  ).map(
    ([key, value]) =>
      areaDetailsDictionary[key] && (
        <li
          key={key}
          className="flex justify-between text-center md:bg-gray-100 md:flex-col md:justify-normal md:px-2 md:rounded-lg"
        >
          <p className="text-md md:font-semibold">
            {areaDetailsDictionary[key]}
          </p>
          <span className="text-gray-400 font-normal">{value}</span>
        </li>
      )
  );

  const details = Object.entries(
    propertyDetails?.fields as [string, string]
  ).map(
    ([key, value]) =>
      propertyDetailsDictionary[key] && (
        <li
          key={key}
          className="flex justify-between text-center md:bg-gray-100 md:flex-col md:justify-normal md:px-2 md:rounded-lg"
        >
          <p className="text-md md:font-semibold">
            {propertyDetailsDictionary[key]}
          </p>
          <span className="text-gray-400 font-normal">{value}</span>
        </li>
      )
  );

  const handleToggleDescription = useCallback(() => {
    setToggleDescription((prev) => !prev);
  }, [toggleDescription]);

  return (
    <div>
      <div className="mt-5">
        <p className="font-bold text-2xl mb-2">{areaTitle}</p>
        <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          {areaDetails}
        </ul>
      </div>
      <div className="mt-5">
        <p className="font-bold text-2xl mb-2">{propertyTitle}</p>
        <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap">
          {details}
        </ul>
      </div>
      <AdDescription
        toggleDescription={toggleDescription}
        handleToggleDescription={handleToggleDescription}
        description={description}
      />

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
  );
};
