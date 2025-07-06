import { AdsSectionType } from "@/app/(root)/data/data";
import { CategorySection } from "./CategorySection";

export const CaterorySectionList = ({ data }: { data: AdsSectionType[] }) => {
  if (data.length > 0) {
    return (
      <>
        {data?.map((item) => (
          <CategorySection key={item.title} section={item} />
        ))}
      </>
    );
  }
  return (
    <h3 className="text-center font-medium">
      В вашем городе пока нет объявлений, самое время их создать
    </h3>
  );
};
