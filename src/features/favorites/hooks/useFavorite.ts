// import { useAuth } from "@/entities/user/hooks/useAuth";
// import { GET_FAVORITES } from "@/shared/config/apollo/requests/getFavorites";
// // import { TOGGLE_FAVORITES } from "@/shared/config/apollo/requests/toggleFavorite";
// import { useMutation, useQuery } from "@apollo/client";
// import { useEffect, useState } from "react";

// const FAVORITES_STORAGE_KEY = "favorites";

// export const useFavorite = () => {
//   const [hasInFavorite, setHasInFavorite] = useState(false);
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const { isAuth } = useAuth();

//   const { data, refetch } = useQuery(GET_FAVORITES, {
//     skip: !isAuth,
//   });

//   const [toggleFavorite] = useMutation(TOGGLE_FAVORITES, {
//     onCompleted: (mutationData) => {
//       setHasInFavorite(
//         mutationData.toggleFavoriteAd.status === "added" ? true : false
//       );
//     },
//   });

//   useEffect(() => {
//     if (isAuth && data) {
//       console.log(data.getFavoriteAds[0].ad.id);
//       setFavorites(data.getFavoriteAds.map(({ ad }) => ad.id));
//     } else {
//       const favoritesLS = JSON.parse(
//         localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]"
//       ) as string[];
//       setFavorites(favoritesLS);
//     }
//   }, [isAuth, data]);

//   const handleToggleFavorite = (adId: string) => {
//     if (isAuth) {
//       toggleFavorite({
//         variables: {
//           id: adId,
//         },
//       });
//       return;
//     }
//     toggleFavoriteToLocalStorage(adId);
//   };

//   const toggleFavoriteToLocalStorage = (adId: string) => {
//     const favorites = JSON.parse(
//       localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]"
//     ) as string[];
//     const includesInStorage = favorites.includes(adId);
//     const newFavorites = includesInStorage
//       ? favorites.filter((id) => id !== adId)
//       : [...favorites, adId];
//     localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
//     setHasInFavorite(includesInStorage ? false : true);
//   };

//   return {
//     handleToggleFavorite,
//     hasInFavorite: (adId: string) => favorites.includes(adId),
//     favorites,
//   };
// };
