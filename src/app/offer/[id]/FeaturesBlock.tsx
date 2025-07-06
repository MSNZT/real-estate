"use client";
import { Ad } from "@/shared/config/apollo/generated";
import { featuresDictionary } from "./const/features.const";

export const FeaturesBlock = ({ features }: { features: Ad["features"] }) => {
  return (
    <div className="max-w-[744px]">
      <p className="font-bold text-2xl mb-2">Особенности</p>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map(
          (feature) =>
            featuresDictionary[feature] && (
              <li key={feature} className="flex items-center gap-2">
                {featuresDictionary[feature].icon}
                <span className="text-md">
                  {featuresDictionary[feature].text}
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};
