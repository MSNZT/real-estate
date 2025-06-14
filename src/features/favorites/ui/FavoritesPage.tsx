"use client";

import { GET_FAVORITES } from "@/shared/config/apollo/requests/getFavorites";
import { useQuery } from "@apollo/client";
import { Button, Container, Loader } from "@/shared/ui";
import { useAuth } from "@/entities/user";
import { AdCardPreview } from "@/entities/ad";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";
import { useSyncLocalFavorites } from "../hooks/useSyncLocalFavorites";
// import { TOGGLE_FAVORITES } from "@/shared/config/apollo/requests/toggleFavorite";
// import { useFavorite } from "../hooks/useFavorite";
import { useFavorites } from "../model/useFavorites";

export const FavoritesPage = () => {
  const { isAuth, isLoading: isAuthLoading } = useAuth();
  useSyncLocalFavorites();
  const { handleToggleFavorite, hasInFavorites } = useFavorites();

  const {
    loading: favoritesLoading,
    error,
    data,
  } = useQuery(GET_FAVORITES, {
    skip: !isAuth,
    fetchPolicy: "cache-and-network",
  });

  // const [toggleFavorite, { loading: toggleLoading }] = useMutation(
  //   TOGGLE_FAVORITES,
  //   {
  //     update: (cache, { data: mutationData }) => {
  //       if (!mutationData.toggleFavoriteAd.id) return;

  //       const existing = cache.readQuery({ query: GET_FAVORITES });
  //       if (!existing) return;

  //       cache.writeQuery({
  //         query: GET_FAVORITES,
  //         data: {
  //           getFavoriteAds: existing.getFavoriteAds.filter(
  //             ({ ad }) => ad.id !== mutationData.toggleFavoriteAd.id
  //           ),
  //         },
  //       });
  //     },
  //   }
  // );

  if (isAuthLoading || (isAuth && favoritesLoading && !data)) {
    return (
      <Container className="h-[calc(100vh-80px)] flex justify-center items-center">
        <Loader />
      </Container>
    );
  }

  // function handleToggleFavorite(id: string) {
  //   toggleFavorite({
  //     variables: {
  //       id,
  //     },
  //   });
  // }

  if (error) {
    return (
      <Container className="h-[calc(100vh-80px)] flex flex-col items-center justify-center min-h-[300px] gap-2">
        <p>Возникла ошибка при загрузке понравившихся объявлений</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Повторить попытку
        </Button>
      </Container>
    );
  }

  if (!data?.getFavoriteAds?.length) {
    return (
      <Container className="h-[calc(100vh-80px-80px)] flex flex-col items-center justify-center min-h-[300px] gap-4">
        <h3 className="text-xl font-medium">Нет избранных объявлений</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Сохраняйте понравившиеся объявления, чтобы легко вернуться к ним позже
        </p>
      </Container>
    );
  }

  return (
    <Container className="h-[calc(100vh-80px)] mt-5">
      <h1 className="text-2xl font-bold mb-4">Избранное</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.getFavoriteAds.map(({ ad }) => (
          <AdCardPreview
            key={ad.id}
            item={ad}
            period={getDealPeriod(ad)}
            price={getPrettyPrice(ad.deal.price)}
            onToggleFavorite={() => handleToggleFavorite(ad.id)}
            hasInFavorite={(ad) => hasInFavorites(ad.id)}
            showFavorite
          />
        ))}
      </div>
    </Container>
  );
};
