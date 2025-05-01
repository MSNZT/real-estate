export const FieldLabel = ({ label }: { label: string | undefined }) => {
  return (
    label && (
      <p className="max-w-[170px] w-full font-semibold sm:font-normal">
        {label}
      </p>
    )
  );
};
