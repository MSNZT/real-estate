import { $api } from "@/shared/api/lib/axios";

export async function computeCityByIp(ip: string): Promise<string | boolean> {
  try {
    const response = await $api.post<string | boolean>(
      "location/compute-location",
      { ip }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
