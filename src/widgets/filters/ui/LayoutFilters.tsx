export const LayoutFilters = () => {
  return (
    <div className="flex flex-col gap-10">
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/rent/apartment">
              <span className="underline underline-offset-4">Снять</span>
            </Link>
          </li>
          <li>
            <Link href="/sell/apartment">
              <span>Купить</span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <div className="relative">
        <div className="flex items-center mb-5 justify-between">
          <div className="flex items-center overflow-hidden gap-2">
            <SelectPropertyType
              adType={params.adType}
              propertyType={params.propertyType}
            />
            <FiltersButton />
          </div>
          <MapPopupButton />
        </div>
        {children}
      </div> */}
    </div>
  );
};
