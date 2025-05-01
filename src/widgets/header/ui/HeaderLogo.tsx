import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center text-primary m-0">
      {/* <Icon Svg={HunterIcon} width={40} height={40} /> */}
      <h1 className="relative font-bold text-2xl">Find Estate</h1>
    </Link>
  );
};
