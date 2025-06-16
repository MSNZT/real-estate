import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
  type DragEvent,
} from "react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { fileService } from "@/shared/services/file.service";

interface FileUploadProps {
  setFiles: (urls: string[]) => void;
  children: ReactNode;
  isUploadLimit: boolean;
  limit: number;
  currentFileCount: number;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const FileUpload = ({
  setFiles,
  children,
  isUploadLimit,
  limit,
  currentFileCount,
}: FileUploadProps) => {
  const [error, setError] = useState("");
  const { mutate } = useMutation<string[], Error, FormData>({
    mutationFn: (formData) => fileService.uploadFiles(formData),
    onSuccess: (urls) => setFiles(urls),
    onError: (responseError) => setError(responseError.message),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClickButton = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const uploadFiles = useCallback(
    async (files: FileList) => {
      if (isUploadLimit) return;

      const validFiles = Array.from(files).filter((file) => {
        if (!ALLOWED_EXTENSIONS.includes(file.type)) return false;
        if (file.size > MAX_FILE_SIZE) return false;
        return true;
      });

      const availableSlots = Math.max(0, limit - currentFileCount);
      const filesToUpload = validFiles.slice(0, availableSlots);

      console.log(availableSlots, filesToUpload);

      const formData = new FormData();
      filesToUpload.forEach((file) => formData.append("files", file));

      mutate(formData);
    },
    [isUploadLimit, currentFileCount, limit]
  );

  const handleUploadFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.[0]) return;

      uploadFiles(files);
    },
    [uploadFiles]
  );

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    uploadFiles(files);
  };

  return (
    <>
      <div
        className={cn("border border-dashed rounded-lg", {
          "border-solid cursor-pointer": isDragging,
        })}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        draggable
      >
        <input
          type="file"
          multiple
          accept="image/png, image/jpg, image/jpeg, image/webp"
          className="sr-only"
          ref={inputRef}
          onChange={handleUploadFiles}
        />
        <div className="p-15 text-center">
          <Button
            type="button"
            onClick={handleClickButton}
            className="mr-4 text-white bg-primary hover:bg-chart-2"
          >
            Выберите фотографии
          </Button>
          <span className="hidden lg:inline">или перетащите в область</span>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {children}
    </>
  );
};
