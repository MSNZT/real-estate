import { notFound } from "next/navigation";

export function checkParams(adType: string, propertyType: string) {
  const url = `/${adType}/${propertyType}`;

  const allowPaths = [
    "/rent/apartment",
    "/rent/house",
    "/sell/apartment",
    "/sell/house",
  ];

  if (!allowPaths.includes(url)) {
    notFound();
  }
}
