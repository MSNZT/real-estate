import { Ad } from "@/shared/config/apollo/generated/types";
import { MapPin } from "lucide-react";

export const AdCardLocation = ({ location }: { location: Ad["location"] }) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      <MapPin size={12} />
      <span className="text-xs">
        {location.city}, {location.street}
      </span>
    </div>
  );
};
