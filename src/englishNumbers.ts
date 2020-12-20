export default function numberOrNumbers(number: number, name: string): string {
  const numberAbs = Math.abs(number);

  if (numberAbs === 1) return `${number} ${name}`;
  if (numberAbs !== 1) return `${number} ${name}s`;

  return "";
}
