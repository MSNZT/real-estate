import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
// import { FilterFields } from "@/app/[adType]/[propertyType]/FilterFields";
import { Button } from "@/shared/ui";
import { AdTypes, PropertyTypes } from "@/entities/ad";
// import { adFiltersVar } from "@/shared/lib/apollo/apolloClient";

export const FiltersContent = ({ onClose }: { onClose: () => void }) => {
  const methods = useForm({
    defaultValues: {},
  });

  const { adType, propertyType } = useParams() as {
    adType: AdTypes;
    propertyType: PropertyTypes;
  };

  function onSubmit(value: Record<string, any>) {
    onClose();
  }

  function onResetFilters() {
    // adFiltersVar({ adType, propertyType });
    methods.reset({});
    onClose();
  }

  return (
    <div
      className="space-y-4 pe-8 overflow-y-auto [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-full"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className="text-[26px] font-bold mb-4">Фильтр объявлений</h2>
          {/* <FilterFields adType={adType} propertyType={propertyType} /> */}
          <div className="flex gap-3 justify-end mb-2">
            <Button
              type="button"
              onClick={onResetFilters}
              className="max-w-[150px] w-full"
            >
              Очистить
            </Button>
            <Button className="max-w-[150px] w-full">Применить</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
