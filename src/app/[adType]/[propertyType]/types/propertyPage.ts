import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";

export type UrlPaths = {
  adType: AdTypes;
  propertyType: PropertyTypes;
};

export interface PageProps {
  params: Promise<UrlPaths>;
}
