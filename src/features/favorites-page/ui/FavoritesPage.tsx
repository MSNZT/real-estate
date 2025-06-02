"use client";

import { GET_FAVORITES } from "@/shared/config/apollo/requests/getFavorites";
import { useQuery } from "@apollo/client";
import { Button, Container, Loader } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useAuth } from "@/entities/user/hooks/useAuth";
import { AdCardPreview } from "@/entities/ad";
import { getDealPeriod } from "@/entities/ad/utils/getDealPeriod";
import { getPrettyPrice } from "@/entities/ad/utils/getPrettyPrice";

export const FavoritesPage = () => {
  const router = useRouter();
  const { isAuth, isLoading: isAuthLoading } = useAuth();

  const {
    loading: favoritesLoading,
    error,
    data,
  } = useQuery(GET_FAVORITES, {
    skip: !isAuth,
    fetchPolicy: "cache-and-network",
  });

  if (isAuthLoading || (isAuth && favoritesLoading && !data)) {
    return (
      <Container className="h-[calc(100vh-80px)] flex justify-center items-center">
        <Loader />
      </Container>
    );
  }

  if (!isAuth) {
    return (
      <Container className="h-[calc(100vh-80px)] flex flex-col items-center justify-center min-h-[300px] gap-4">
        <h3 className="text-xl font-medium">Избранные объявления</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Авторизуйтесь, чтобы просматривать и сохранять понравившиеся
          объявления
        </p>
        <Button onClick={() => router.push("/auth/login")}>Войти</Button>
      </Container>
    );
  }

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
      <Container className="h-[calc(100vh-80px)] flex flex-col items-center justify-center min-h-[300px] gap-4">
        <h3 className="text-xl font-medium">Нет избранных объявлений</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Сохраняйте понравившиеся объявления, чтобы легко найти их позже
        </p>
        <Button onClick={() => router.push("/ads")}>Найти объявления</Button>
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
          />
        ))}
      </div>
    </Container>
  );
};
