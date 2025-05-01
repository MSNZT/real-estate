import { FC, SVGProps } from "react";

interface IconProps {
  Svg: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}
export const Icon = ({ Svg, className }: IconProps) => {
  return <Svg className={className} />;
};
