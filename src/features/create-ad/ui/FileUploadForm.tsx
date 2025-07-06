import { useCallback } from "react";
import { FileUpload } from "./FileUpload";
import { Button } from "@/shared/ui";
import { X } from "lucide-react";
import { Controller, ControllerRenderProps, FieldError } from "react-hook-form";
import { AdFormData, FormField } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { fileService } from "@/shared/services/file.service";

interface FileUploadForm {
  error?: FieldError;
  dynamicField: Extract<FormField, { type: "file" }>;
}

export const FileUploadForm = ({ dynamicField, error }: FileUploadForm) => {
  const { mutate } = useMutation<string, Error, string>({
    mutationFn: (fileName) => fileService.removeFile(fileName),
  });
  const handleRemoveUrl = useCallback(
    (url: string, field: ControllerRenderProps) => {
      const fileName = url.split("assets/")[1];
      mutate(fileName);
      const newArray = field.value.filter((fileUrl) => fileUrl !== url);
      field.onChange(newArray);
    },
    []
  );

  const handleAddFiles = useCallback(
    (urls: string[], field: ControllerRenderProps) => {
      field.onChange([...field.value, ...urls]);
    },
    []
  );

  return (
    <Controller
      name={dynamicField.name}
      render={({ field }) => {
        const photos = field.value as AdFormData["photos"];
        return (
          <>
            <div className="flex items-center flex-wrap gap-3 mb-4">
              {photos.map((url, i) => (
                <div
                  key={i}
                  className="relative w-[120px] h-24 rounded-lg overflow-hidden shadow"
                >
                  <img
                    className="w-full h-full shadow object-cover z-10"
                    src={url}
                    alt="Фотография"
                  />
                  <div className="absolute top-1 right-1 pointer-events-none">
                    <Button
                      className="cursor-pointer z-20 pointer-events-auto rounded-full bg-black shadow"
                      variant="outline"
                      size="clear"
                      onClick={() => handleRemoveUrl(url, field)}
                      type="button"
                    >
                      <X size={18} className="text-white hover:text-white/90" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <FileUpload
              setFiles={(urls) => handleAddFiles(urls, field)}
              isUploadLimit={field.value.length >= dynamicField.limit}
              limit={dynamicField.limit}
              currentFileCount={field.value.length}
            >
              {error && (
                <span className="text-red-500 text-sm">{error.message}</span>
              )}
            </FileUpload>
          </>
        );
      }}
    />
  );
};
