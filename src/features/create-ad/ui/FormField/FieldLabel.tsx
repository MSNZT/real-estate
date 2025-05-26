export const FieldLabel = ({ label }: { label: string | undefined }) => {
  return (
    label && (
      <p className="w-full md:max-w-[170px] font-semibold sm:font-normal">
        {label}
      </p>
    )
  );
};
