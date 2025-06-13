// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useAuthContext } from "@/app/providers/AuthProvider";
// import { useIsMounted } from "@/shared/lib/useIsMounted";
// import { authService } from "@/shared/services/auth.service";
// import { tokenService } from "@/shared/services/token.service";

// export const useAuth = () => {
//   // const { hasRefresh } = useAuthContext();
//   // // const queryClient = useQueryClient();
//   // const isMounted = useIsMounted();
//   // const hasToken = isMounted && !!tokenService.getAccessToken();

//   // const {
//   //   data: user,
//   //   isLoading,
//   //   isError,
//   //   isSuccess,
//   // } = useQuery({
//   //   queryKey: ["auth", "me"],
//   //   queryFn: async () => {
//   //     // Доделать
//   //     let access = tokenService.getAccessToken();
//   //     if (!access && hasRefresh) {
//   //       await authService.refreshAuthToken();
//   //       access = tokenService.getAccessToken();
//   //     }
//   //     if (access) {
//   //       return await authService.getMe();
//   //     }
//   //     throw new Error("No access token");
//   //   },
//   //   enabled: hasRefresh,
//   //   retry: false,
//   //   refetchOnWindowFocus: false,
//   //   // staleTime: 1000 * 60 * 5,
//   // });

//   // // console.log("test", {
//   // //   isMounted: !isMounted,
//   // //   hasToken: hasToken,
//   // //   isLoading: isLoading,
//   // // });

//   // const isAuth = !!user;
//   // const isGuest = !isLoading && !isAuth;

//   // return {
//   //   user,
//   //   isLoading: isMounted && hasToken && isLoading,
//   //   isAuth,
//   //   isGuest,
//   //   isError,
//   //   isSuccess,
//   //   isMounted,
//   // };
//   const { hasRefresh } = useAuthContext();
//   const isMounted = useIsMounted();
//   const hasAccess = isMounted && !!tokenService.getAccessToken();

//   const {
//     data: user,
//     isLoading: queryLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["auth", "me"],
//     queryFn: async () => {
//       let access = tokenService.getAccessToken();
//       if (!access && hasRefresh) {
//         await authService.refreshAuthToken();
//         access = tokenService.getAccessToken();
//       }
//       if (access) {
//         return await authService.getMe();
//       }
//       throw new Error("No access token");
//     },
//     enabled: isMounted && (hasRefresh || hasAccess),
//     retry: false,
//     refetchOnWindowFocus: false,
//   });

//   // Логика флагов
//   // 1. Если нет access и нет refresh — сразу гость, loader не нужен
//   // 2. Если делается запрос (refresh/me) — loader
//   // 3. Если запрос завершился, есть user — isAuth
//   // 4. Если запрос завершился, user нет — isGuest

//   const isLoading = isMounted && (hasRefresh || hasAccess) && queryLoading;
//   const isAuth = !!user;
//   const isGuest =
//     isMounted &&
//     !isLoading &&
//     !user &&
//     ((!hasRefresh && !hasAccess) || isError);

//   return {
//     user,
//     isLoading,
//     isAuth,
//     isGuest,
//   };
// };

"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { useIsMounted } from "@/shared/lib/useIsMounted";
import { authService } from "@/shared/services/auth.service";
import { tokenService } from "@/shared/services/token.service";

export const useAuth = () => {
  const { hasRefresh } = useAuthContext();
  console.log(hasRefresh, "AUUUU");

  const isMounted = useIsMounted();

  // Проверяем токен только после mount
  const hasAccess = isMounted && !!tokenService.getAccessToken();

  // enabled: только если есть refresh или access
  const shouldQuery = isMounted && (hasRefresh || hasAccess);

  const {
    data: user,
    isLoading: queryLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      let access = tokenService.getAccessToken();
      if (!access && hasRefresh) {
        await authService.refreshAuthToken();
        access = tokenService.getAccessToken();
      }
      if (access) {
        return await authService.getMe();
      }
      throw new Error("No access token");
    },
    enabled: shouldQuery,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // isLoading — только если идёт запрос авторизации
  const isLoading = shouldQuery && queryLoading;
  // isAuth — только если user успешно получен
  const isAuth = !!user;
  // isGuest — если нет токенов или запрос завершился ошибкой
  const isGuest =
    isMounted && (!shouldQuery || (!queryLoading && !user && isError));

  return {
    user,
    isLoading,
    isAuth,
    isGuest,
    isError,
    isSuccess,
  };
};
