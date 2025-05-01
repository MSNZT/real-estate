import { Query } from "@/shared/config/apollo/generated/types";
import { GET_AD } from "@/shared/config/apollo/requests/getAd";
import { getClient } from "@/shared/config/apollo/rsc-client";
import { notFound } from "next/navigation";
import { Product } from "./product";

async function getAdById(id: string) {
  const client = getClient();

  try {
    const { data } = await client.query<Query>({
      query: GET_AD,
      variables: {
        id,
      },
    });
    return data;
  } catch (error) {
    console.log("Ошибка при запросе объявления по id", error);
  }
}

export default async function AdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getAdById(id);
  if (!data?.getAdById) notFound();

  return <Product product={data.getAdById} />;
}
