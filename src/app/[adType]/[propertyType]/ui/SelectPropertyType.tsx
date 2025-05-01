"use client";
import { AdTypes, PropertyTypes } from "@/entities/ad";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";

interface SelectPropertyTypeProps {
  adType: AdTypes;
  propertyType: PropertyTypes;
}

export const SelectPropertyType = ({
  adType,
  propertyType,
}: SelectPropertyTypeProps) => {
  const PropertyTypeNames = {
    house: "Дом",
    apartment: "Квартира",
  } satisfies { [key in PropertyTypes]: string };

  const handlePropertyTypeChange = (newPropertyType: string) => {
    if (newPropertyType === propertyType) return;
    window.location.href = `/${adType}/${newPropertyType}`;
  };

  return (
    <Select onValueChange={handlePropertyTypeChange}>
      <SelectTrigger className="w-[150px] flex-shrink-0 text-sm">
        <SelectValue
          placeholder={PropertyTypeNames[propertyType]}
          defaultValue={propertyType}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-[200px]">
          {Object.entries(PropertyTypeNames).map(
            ([propertyKey, propertyValue]) => (
              <SelectItem key={propertyKey} value={propertyKey}>
                {propertyValue}
              </SelectItem>
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
