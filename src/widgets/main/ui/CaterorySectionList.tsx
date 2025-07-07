import { AdsSectionType } from "@/app/(root)/data/data";
import { CategorySection } from "./CategorySection";
import { Container } from "@/shared/ui";

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
    <Container>
      <h3 className="text-center font-medium">
        В вашем городе пока нет объявлений, самое время их создать
      </h3>
    </Container>
  );
};
