import { Query } from "@/shared/config/apollo/generated/types";
import { Hero } from "@/widgets/main/ui/Main";
import { getAdsPreviewData } from "./data/data";
import { cookies, headers } from "next/headers";
import { $api } from "@/shared/api/lib/axios";
import { computeCityByIp } from "./data/city";

export type AdsSectionType = {
  title: string;
  data: Query["getAllAds"]["ads"] | [];
  href: string;
};

export const revalidate = 600;

export default async function Page() {
  const cookieStore = await cookies();
  let cityCookie = cookieStore.get("city")?.value;

  if (cityCookie !== undefined) {
    const city = cityCookie !== "false" ? cityCookie : "Санкт-Петербург";
    const response = await getAdsPreviewData(city);
    return <Hero data={response} />;
  }

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim();

  let city = "Санкт-Петербург";
  if (ip) {
    const { data } = await computeCityByIp(ip);
    if (typeof data === "string" && data) {
      city = data;
      await $api.post("location/apply-city", { city });
    } else {
      await $api.post("location/apply-city", { city: false });
    }
  } else {
    await $api.post("location/apply-city", { city: false });
  }

  const response = await getAdsPreviewData(city);
  return <Hero data={response} />;
}
