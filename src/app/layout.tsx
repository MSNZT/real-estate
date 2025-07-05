import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers/Providers";
import { Navbar } from "@/widgets/navbar/ui/Navbar";
import "./globals.css";
import { LocationState } from "@/shared/hooks/use-location";
import { cn } from "@/shared/lib/utils";

const nunito = Nunito({
  subsets: ["cyrillic"],
  preload: true,
  style: "normal",
  weight: ["400", "500", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Find Estate",
  description:
    "Find Estate – это удобный онлайн-сервис для поиска, аренды и продажи недвижимости, где пользователи могут размещать свои объявления. Наша платформа позволяет легко находить квартиры, дома и коммерческие объекты, добавляя фильтры по местоположению, типу недвижимости, цене и другим параметрам.",
};

export const viewport: Viewport = {
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasRefresh = !!(await cookies()).get("refreshToken");
  const locationCookie = (await cookies()).get("location")?.value;
  const location = JSON.parse(
    locationCookie || "{}"
  ) as LocationState["location"];
  const theme = (await cookies()).get("theme")?.value;

  return (
    <html lang="ru">
      <body className={cn(nunito.className, theme)}>
        <Toaster />
        <Providers hasRefresh={hasRefresh} location={location}>
          {children}
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
