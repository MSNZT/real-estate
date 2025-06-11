import { DataSuggestionType } from "@/shared/types/location";

export const TOP_CITIES: {
  value: string;
  data: Partial<DataSuggestionType>;
}[] = [
  {
    value: "Москва",
    data: { city: "Москва", geo_lat: "55.7558", geo_lon: "37.6176" },
  },
  {
    value: "Санкт-Петербург",
    data: { city: "Санкт-Петербург", geo_lat: "59.9343", geo_lon: "30.3351" },
  },
  {
    value: "Калининград",
    data: { city: "Калининград", geo_lat: "54.7104", geo_lon: "20.5104" },
  },
  {
    value: "Тюмень",
    data: { city: "Тюмень", geo_lat: "57.1530", geo_lon: "65.5343" },
  },
  {
    value: "Сочи",
    data: { city: "Сочи", geo_lat: "43.5855", geo_lon: "39.7231" },
  },
  {
    value: "Нижний Новгород",
    data: { city: "Нижний Новгород", geo_lat: "56.3269", geo_lon: "44.0075" },
  },
  {
    value: "Казань",
    data: { city: "Казань", geo_lat: "55.7961", geo_lon: "49.1064" },
  },
  {
    value: "Екатеринбург",
    data: { city: "Екатеринбург", geo_lat: "56.8380", geo_lon: "60.5975" },
  },
  {
    value: "Краснодар",
    data: { city: "Краснодар", geo_lat: "45.0355", geo_lon: "38.9753" },
  },
  {
    value: "Новосибирск",
    data: { city: "Новосибирск", geo_lat: "55.0302", geo_lon: "82.9204" },
  },
];
