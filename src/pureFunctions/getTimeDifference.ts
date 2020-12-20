import belRusNumbers from "./belRusNumbers";
import englishNumbers from "./englishNumbers";
import { LocalLanguageInterface } from "../language/LanguageProvider";

export interface getTimeDifferenceInterface {
  explane: string;
  years: string;
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function getTimeDifference(
  dateNote: number,
  language: LocalLanguageInterface
): getTimeDifferenceInterface {
  const dateNow = new Date().setMilliseconds(0);

  const yearsNote = new Date(dateNote).getFullYear();
  const yearsNow = new Date(dateNow).getFullYear();

  const monthsNote = new Date(dateNote).getMonth();
  const monthsNow = new Date(dateNow).getMonth();

  const daysNote = new Date(dateNote).getDate();
  const daysNow = new Date(dateNow).getDate();

  const hoursNote = new Date(dateNote).getHours();
  const hoursNow = new Date(dateNow).getHours();

  const minutesNote = new Date(dateNote).getMinutes();
  const minutesNow = new Date(dateNow).getMinutes();

  const secondsNote = new Date(dateNote).getSeconds();
  const secondsNow = new Date(dateNow).getSeconds();

  const daysInMonth =
    monthsNow === 3 || monthsNow === 5 || monthsNow === 8 || monthsNow === 10
      ? 30
      : monthsNow === 2 && yearsNow % 4 === 0
      ? 29
      : monthsNow === 2 && yearsNow % 4 !== 0
      ? 27
      : 31;

  let diffTime = (dateNow - dateNote) / 1000;

  let diffYears = diffTime > 0 ? yearsNow - yearsNote : yearsNote - yearsNow;
  let diffMonths =
    diffTime > 0 ? monthsNow - monthsNote : monthsNote - monthsNow;
  let diffDays = diffTime > 0 ? daysNow - daysNote : daysNote - daysNow;
  let diffHours = diffTime > 0 ? hoursNow - hoursNote : hoursNote - hoursNow;
  let diffMinutes =
    diffTime > 0 ? minutesNow - minutesNote : minutesNote - minutesNow;
  let diffSeconds =
    diffTime > 0 ? secondsNow - secondsNote : secondsNote - secondsNow;

  if (
    diffMonths === 0 &&
    diffDays === 0 &&
    diffHours === 0 &&
    diffMinutes === 0 &&
    diffSeconds < 0
  )
    diffYears -= 1;
  if (diffMonths === 0 && diffDays === 0 && diffHours === 0 && diffMinutes < 0)
    diffYears -= 1;
  if (diffMonths === 0 && diffDays === 0 && diffHours < 0) diffYears -= 1;
  if (diffMonths === 0 && diffDays < 0) diffYears -= 1;
  if (diffMonths < 0) diffYears -= 1;

  if (diffDays === 0 && diffHours === 0 && diffMinutes === 0 && diffSeconds < 0)
    diffMonths -= 1;
  if (diffDays === 0 && diffHours === 0 && diffMinutes < 0) diffMonths -= 1;
  if (diffDays === 0 && diffHours < 0) diffMonths -= 1;
  if (diffDays < 0) diffMonths -= 1;

  if (diffHours === 0 && diffMinutes === 0 && diffSeconds < 0) diffDays -= 1;
  if (diffHours === 0 && diffMinutes < 0) diffDays -= 1;
  if (diffHours < 0) diffDays -= 1;

  if (diffMinutes === 0 && diffSeconds < 0) diffHours -= 1;
  if (diffMinutes < 0) diffHours -= 1;

  if (diffSeconds < 0) diffMinutes -= 1;

  diffMonths = diffMonths < 0 ? 12 + diffMonths : diffMonths;
  diffDays = diffDays < 0 ? daysInMonth + diffDays : diffDays;
  diffHours = diffHours < 0 ? 24 + diffHours : diffHours;
  diffMinutes = diffMinutes < 0 ? 60 + diffMinutes : diffMinutes;
  diffSeconds = diffSeconds < 0 ? 60 + diffSeconds : diffSeconds;

  const localeNumber = (number: number, measure: string) => {
    if (language.name === "by") {
      if (measure === "years") {
        return belRusNumbers(number, "год", "гады", "гадоў");
      }
      if (measure === "months") {
        return belRusNumbers(number, "месяц", "месяцы", "месяцаў");
      }
      if (measure === "days") {
        return belRusNumbers(number, "дзень", "дні", "дзён");
      }
      if (measure === "hours") {
        return belRusNumbers(number, "гадзіна", "гадзіны", "гадзін");
      }
      if (measure === "minutes") {
        return belRusNumbers(number, "хвіліна", "хвіліны", "хвілін");
      }
      if (measure === "seconds") {
        return belRusNumbers(number, "секунда", "секунды", "секунд");
      }
    }
    if (language.name === "en") {
      if (measure === "years") {
        return englishNumbers(number, "year");
      }
      if (measure === "months") {
        return englishNumbers(number, "month");
      }
      if (measure === "days") {
        return englishNumbers(number, "day");
      }
      if (measure === "hours") {
        return englishNumbers(number, "hour");
      }
      if (measure === "minutes") {
        return englishNumbers(number, "minute");
      }
      if (measure === "seconds") {
        return englishNumbers(number, "second");
      }
    }
    if (language.name === "ru") {
      if (measure === "years") {
        return belRusNumbers(number, "год", "года", "лет");
      }
      if (measure === "months") {
        return belRusNumbers(number, "месяц", "месяца", "месяцев");
      }
      if (measure === "days") {
        return belRusNumbers(number, "день", "дня", "дней");
      }
      if (measure === "hours") {
        return belRusNumbers(number, "час", "часа", "часов");
      }
      if (measure === "minutes") {
        return belRusNumbers(number, "минута", "минуты", "минут");
      }
      if (measure === "seconds") {
        return belRusNumbers(number, "секунда", "секунды", "секунд");
      }
    }
    return "";
  };

  const timeDifference = {
    explane:
      diffTime === 0
        ? language.now
        : diffTime > 0
        ? language.passed
        : language.left,
    years: diffYears !== 0 ? localeNumber(diffYears, "years") : "",
    months:
      diffMonths !== 0 || diffYears !== 0
        ? localeNumber(diffMonths, "months")
        : "",
    days:
      diffDays !== 0 || diffMonths !== 0 || diffYears !== 0
        ? localeNumber(diffDays, "days")
        : "",
    hours:
      diffHours !== 0 || diffDays !== 0 || diffMonths !== 0 || diffYears !== 0
        ? localeNumber(diffHours, "hours")
        : "",
    minutes:
      diffMinutes !== 0 ||
      diffHours !== 0 ||
      diffDays !== 0 ||
      diffMonths !== 0 ||
      diffYears !== 0
        ? localeNumber(diffMinutes, "minutes")
        : "",
    seconds:
      diffSeconds !== 0 ||
      diffMinutes !== 0 ||
      diffHours !== 0 ||
      diffDays !== 0 ||
      diffMonths !== 0 ||
      diffYears !== 0
        ? localeNumber(diffSeconds, "seconds")
        : "",
  };
  return timeDifference;
}
