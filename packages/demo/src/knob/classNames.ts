/** */
export default function classNames(
  ...names: (string | null | undefined | false)[]
): string | undefined {
  return names && names.filter(Boolean).join(" ");
}
