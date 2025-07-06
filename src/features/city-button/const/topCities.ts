import { AddressDetails } from "@/shared/types/location";

export const TOP_CITIES = [
  {
    value: "Москва",
    city: "Москва",
    geo_lat: "55.7558",
    geo_lon: "37.6176",
  },
  {
    value: "Санкт-Петербург",
    city: "Санкт-Петербург",
    geo_lat: "59.9343",
    geo_lon: "30.3351",
  },
  {
    value: "Калининград",
    city: "Калининград",
    geo_lat: "54.7104",
    geo_lon: "20.5104",
  },
  {
    value: "Тюмень",
    city: "Тюмень",
    geo_lat: "57.1530",
    geo_lon: "65.5343",
  },
  {
    value: "Сочи",
    city: "Сочи",
    geo_lat: "43.5855",
    geo_lon: "39.7231",
  },
  {
    value: "Нижний Новгород",
    city: "Нижний Новгород",
    geo_lat: "56.3269",
    geo_lon: "44.0075",
  },
  {
    value: "Казань",
    city: "Казань",
    geo_lat: "55.7961",
    geo_lon: "49.1064",
  },
  {
    value: "Екатеринбург",
    city: "Екатеринбург",
    geo_lat: "56.8380",
    geo_lon: "60.5975",
  },
  {
    value: "Краснодар",
    city: "Краснодар",
    geo_lat: "45.0355",
    geo_lon: "38.9753",
  },
  {
    value: "Новосибирск",
    city: "Новосибирск",
    geo_lat: "55.0302",
    geo_lon: "82.9204",
  },
] satisfies Partial<AddressDetails>[];
