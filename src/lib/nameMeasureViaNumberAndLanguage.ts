import belNumbers from "./belNumbers";
import rusNumbers from "./rusNumbers";

export default function nameMeasureViaNumberAndLanguage(
  number: number,
  measure: string,
  language: string
) {
  if (language === "by") {
    return belNumbers(number, measure);
  }
  if (language === "ru") {
    return rusNumbers(number, measure);
  }
  return Math.abs(number) === 1
    ? `${number} ${measure}`
    : `${number} ${measure}s`;
}
