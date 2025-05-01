import { CreateAd } from "@/features/create-ad";
import { headers } from "next/headers";

export default async function Page() {
  const ip = (await headers()).get("x-forwarded-for");
  console.log(ip);

  return <CreateAd />;
}
