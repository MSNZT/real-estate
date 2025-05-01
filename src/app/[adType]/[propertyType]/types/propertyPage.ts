import { AdTypes, PropertyTypes } from "@/entities/ad";

export type UrlPaths = {
  adType: AdTypes;
  propertyType: PropertyTypes;
};

export interface PageProps {
  params: Promise<UrlPaths>;
}
