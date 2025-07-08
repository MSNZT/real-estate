import { $api } from "@/shared/api/lib/axios";

export async function computeCityByIp(ip: string): Promise<string | undefined> {
  try {
    const response = await $api.post<string>("location/compute-location", {
      ip,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
