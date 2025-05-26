import { AxiosError } from "axios";
import { $apiWithAuth } from "../api/axios";

export class FileService {
  async uploadFiles(formData: FormData): Promise<string[]> {
    try {
      const { data } = await $apiWithAuth.post<string[]>(
        "files/uploads",
        formData
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          throw new Error("Для загрузки изображений необходимо авторизоваться");
        }
      }
      throw new Error("Не удалось загрузить изображения");
    }
  }

  async removeFile(fileName: string): Promise<string> {
    try {
      const { data } = await $apiWithAuth.delete<string>(
        `files/remove/${fileName}`
      );
      return data;
    } catch (error) {
      throw new Error("Ошибка при удалении изображения");
    }
  }
}

export const fileService = new FileService();
