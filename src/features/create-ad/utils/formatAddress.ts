export function formatAddress(
  street_with_type: string | null,
  house: string | null
): string {
  return [street_with_type, house].filter(Boolean).join(", ");
}
