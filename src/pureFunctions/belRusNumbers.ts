export default function belRusNumbers(
  number: number,
  name1: string,
  name234: string,
  name5andHigher: string
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
    return `${number} ${name234}`;
  if (
    numberAbs > 4 ||
    number.toString().slice(-2, -1) === "1" ||
    numberAbs === 0
  )
    return `${number} ${name5andHigher}`;

  return "";
}
