import { Hero } from "@/widgets/main/ui/Main";
import { getAdsPreviewData } from "./data/data";
import { cookies } from "next/headers";
import { LocationStateType } from "@/shared/hooks/use-location";

export const revalidate = 600;

export default async function Page() {
  const locationCookie = (await cookies()).get("location")?.value;
  const location = JSON.parse(locationCookie || "{}") as LocationStateType;

  // const response = await getAdsPreviewData(location.city);
  // return <Hero data={response} city={location.city} />;
  return null;
}
