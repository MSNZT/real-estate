import axios from "axios";

export async function getLocationByQuery(query: string) {
  try {
    const { data } = await axios.post(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`,
      {
        query,
        locations: [{ country: "Россия" }],
        from_bound: { value: "city" },
        to_bound: { value: "settlement" },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token 4050077a7049b96f5224fcdfff815e84218026ad`,
        },
      }
    );
    if (data) return data;
    throw new Error("По вашему запросу ничего не найдено");
  } catch (e) {
    console.log(e);
  }
}
