import Link from "next/link";
import { AdsSectionType } from "@/app/(root)/page";
import { AdListsPreview } from "@/widgets/ad-lists";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  section: AdsSectionType;
}

export const CategorySection = ({ section }: CategorySectionProps) => {
  if (!section.data?.length) return null;
  return (
    <div className={"py-3 bg-[#f3f3f6] sm:bg-transparent"} key={section.title}>
      <Link href={section.href} className="group flex items-center gap-2 mb-4">
        <span className={"text-[20px] sm:text-2xl font-bold pl-4 sm:pl-0"}>
          {section.title}
        </span>
        <ChevronRight className="group-hover:translate-x-3 transition-transform duration-500" />
      </Link>
      <AdListsPreview data={section.data} />
    </div>
  );
};
