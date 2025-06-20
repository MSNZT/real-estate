import Link from "next/link";
import { AdsSectionType } from "@/app/(root)/[city]/page";
import { AdListsPreview } from "@/widgets/ad-lists";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  section: AdsSectionType;
}

export const CategorySection = ({ section }: CategorySectionProps) => {
  if (!section.data?.length) return null;
  return (
    <div className="py-3 bg-[#f3f3f6] sm:bg-transparent rounded-l-3xl rounded-r-3xl">
      <Link
        href={section.href}
        className="group flex items-center justify-between sm:justify-start gap-2 mb-4 px-4 p sm:px-0"
      >
        <span className="text-xl sm:text-2xl font-bold ">{section.title}</span>
        <ChevronRight className="group-hover:translate-x-3 transition-transform duration-500" />
      </Link>
      <AdListsPreview data={section.data} />
    </div>
  );
};
