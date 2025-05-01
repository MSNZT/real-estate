import { LayoutForm } from "@/features/auth";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const validSlugs = ["register", "login"];

  if (!validSlugs.includes(slug)) notFound();

  return <LayoutForm slug={slug} />;
}
