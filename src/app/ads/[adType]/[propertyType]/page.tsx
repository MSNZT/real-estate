import PropertiesPage from "./ui/PropertiesPage";
import { checkParams } from "./utils/checkParams";
import { getAllAds } from "./api/getAllAds";
import { PageProps } from "./types/propertyPage";

export default async function Page({ params }: PageProps) {
  const { adType, propertyType } = await params;
  checkParams(adType, propertyType);
  console.log(adType, propertyType);

  await getAllAds({
    adType,
    propertyType,
    page: 1,
    limit: 8,
  });

  return <PropertiesPage adType={adType} propertyType={propertyType} />;
}
