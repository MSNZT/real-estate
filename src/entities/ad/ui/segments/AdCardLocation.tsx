import { Ad } from "@/shared/config/apollo/generated/types";
import { MapPin } from "lucide-react";

export const AdCardLocation = ({ location }: { location: Ad["location"] }) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      <MapPin size={14} />
      <span className="text-sm">{location.address}</span>
    </div>
  );
};
