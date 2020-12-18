export default function rusNumbers(
  number: number,
  name1: string,
  name2: string,
  name3: string
): string {
  const numberAbs = Math.abs(number);

  if (
    numberAbs.toString().slice(-1) === "1" &&
    numberAbs.toString().slice(-2, -1) !== "1"
  )
    return `${number} ${name1}`;
  if (
    (numberAbs.toString().slice(-1) === "2" ||
      numberAbs.toString().slice(-1) === "3" ||
      numberAbs.toString().slice(-1) === "4") &&
    numberAbs.toString().slice(-2, -1) !== "1"
  )
    return `${number} ${name2}`;
  if (numberAbs > 4 || number.toString().slice(-2, -1) === "1" || numberAbs === 0)
    return `${number} ${name3}`;

  return "";
}
