import { $api } from "@/shared/api/lib/axios";

export async function computeCityByIp(ip: string) {
  try {
    return await $api.post<string | boolean>("location/compute-city", { ip });
  } catch (error) {
    console.log(error);
  }
}
