import { AxiosError } from "axios";
import { $api, $apiWithAuth } from "../api/lib/axios";

export class FileService {
  async uploadFiles(formData: FormData): Promise<string[]> {
    try {
      const { data } = await $api.post<string[]>("files/uploads", formData);
      return data;
    } catch (error) {
      throw new Error("Не удалось загрузить изображения");
    }
  }

  async removeFile(fileName: string): Promise<string> {
    try {
      const { data } = await $apiWithAuth.delete<string>(
        `files/remove/${fileName}`
      );
      return data;
    } catch {
      throw new Error("Ошибка при удалении изображения");
    }
  }
}

export const fileService = new FileService();
