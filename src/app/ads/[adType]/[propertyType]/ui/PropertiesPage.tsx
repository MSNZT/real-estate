import { AdList } from "@/widgets/ad-lists/ui/AdList";
import { NavListPage } from "./NavListPage";
import { FiltersButton } from "@/features/filters-button";
import { Container } from "@/shared/ui";
import { SelectPropertyType } from "./SelectPropertyType";
import { MapPopupButton } from "./MapPopupButton";
import { AdTypes, PropertyTypes } from "@/shared/config/apollo/generated";

interface PropertiesPageProps {
  adType: AdTypes;
  propertyType: PropertyTypes;
}

export default function PropertiesPage({
  adType,
  propertyType,
}: PropertiesPageProps) {
  return (
    <>
      <NavListPage />
      <Container>
        <div className="flex items-center mb-5 justify-between">
          <div className="flex items-center overflow-hidden gap-2">
            <SelectPropertyType adType={adType} propertyType={propertyType} />
            <FiltersButton />
          </div>
          <MapPopupButton />
        </div>
      </Container>
      <AdList adType={adType} propertyType={propertyType} />
    </>
  );
}
