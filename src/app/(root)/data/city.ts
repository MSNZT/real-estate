import { $api } from "@/shared/api/lib/axios";
import { LocationStateType } from "@/shared/hooks/use-location";

export async function computeCityByIp(
  ip: string
): Promise<LocationStateType | null> {
  try {
    const response = await $api.post<LocationStateType>(
      "location/compute-location",
      {
        ip,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
