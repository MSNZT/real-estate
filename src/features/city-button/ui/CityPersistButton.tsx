import { useMutation } from "@tanstack/react-query";
import { CitySelectDialog } from "./CitySelectDialog";
import { $api } from "@/shared/api/lib/axios";
import { useRouter } from "next/navigation";

export const CityPersistButton = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: ({ city }: { city: string }) =>
      $api.post("location/apply-city", { city }),
  });
  return (
    <CitySelectDialog
      onSelect={async (city) => {
        await mutateAsync({ city });
        router.refresh();
      }}
      city="Москва"
    />
  );
};
