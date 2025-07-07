import { LOCATION_ENDPOINTS } from "../api/endpoints";
import { $api } from "../api/lib/axios";
import { AddressDetails } from "../types/location";

class LocationService {
  async getSettlementByQuery(
    query: string
  ): Promise<AddressDetails[] | undefined> {
    try {
      const { data } = await $api.post(LOCATION_ENDPOINTS.settlementByQuery, {
        query,
      });
      if (data) return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getAddressByQuery(
    query: string
  ): Promise<AddressDetails[] | undefined> {
    try {
      const { data } = await $api.post<AddressDetails[]>(
        LOCATION_ENDPOINTS.addressByQuery,
        {
          query,
        }
      );
      if (data) return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getAddressByCoords(
    latitude: number,
    longitude: number,
    signal: AbortSignal
  ): Promise<AddressDetails[] | undefined> {
    try {
      const { data } = await $api.post(
        LOCATION_ENDPOINTS.addressByCoords,
        {
          lat: latitude,
          lon: longitude,
        },
        { signal }
      );
      if (data) return data;
    } catch (e) {
      throw e;
    }
  }
}

export const locationService = new LocationService();
