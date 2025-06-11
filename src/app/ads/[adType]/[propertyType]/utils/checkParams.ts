import { notFound } from "next/navigation";

export function checkParams(adType: string, propertyType: string) {
  const url = `/${adType}/${propertyType}`;

  const allowPaths = [
    "/rent_short/apartment",
    "/rent_long/apartment",
    "/sell/apartment",
    "/sell/house",
    "/rent_short/house",
    "/rent_long/house",
  ];

  if (!allowPaths.includes(url)) {
    notFound();
  }
}
