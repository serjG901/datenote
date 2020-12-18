import rusNumbers from "./rusNumbers";

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
  dateNote: number
): getTimeDifferenceInterface {
  const dateNow = new Date().setMilliseconds(0);

  const yearsNote = new Date(dateNote).getFullYear();
  const yearsNow = new Date(dateNow).getFullYear();

  const monthNote = new Date(dateNote).getMonth();
  const monthNow = new Date(dateNow).getMonth();

  const daysNote = new Date(dateNote).getDate();
  const daysNow = new Date(dateNow).getDate();

  const hoursNote = new Date(dateNote).getHours();
  const hoursNow = new Date(dateNow).getHours();

  const minutesNote = new Date(dateNote).getMinutes();
  const minutesNow = new Date(dateNow).getMinutes();

  const secondsNote = new Date(dateNote).getSeconds();
  const secondsNow = new Date(dateNow).getSeconds();

  let diffTime = (dateNow - dateNote) / 1000;

  let diffYears = diffTime > 0 ? yearsNow - yearsNote : yearsNote - yearsNow;
  let diffMonths = diffTime > 0 ? monthNow - monthNote : monthNote - monthNow;
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
  diffDays = diffDays < 0 ? 30 + diffDays : diffDays;
  diffHours = diffHours < 0 ? 24 + diffHours : diffHours;
  diffMinutes = diffMinutes < 0 ? 60 + diffMinutes : diffMinutes;
  diffSeconds = diffSeconds < 0 ? 60 + diffSeconds : diffSeconds;
  const timeDifference = {
    explane: diffTime === 0 ? "cейчас" : diffTime > 0 ? "прошло" : "осталось",
    years: diffYears !== 0 ? rusNumbers(diffYears, "год", "года", "лет") : "",
    months:
      diffMonths !== 0 || diffYears !== 0
        ? rusNumbers(diffMonths, "месяц", "месяца", "месяцев")
        : "",
    days:
      diffDays !== 0 || diffMonths !== 0 || diffYears !== 0
        ? rusNumbers(diffDays, "день", "дня", "дней")
        : "",
    hours:
      diffHours !== 0 || diffDays !== 0 || diffMonths !== 0 || diffYears !== 0
        ? rusNumbers(diffHours, "час", "часа", "часов")
        : "",
    minutes:
      diffMinutes !== 0 ||
      diffHours !== 0 ||
      diffDays !== 0 ||
      diffMonths !== 0 ||
      diffYears !== 0
        ? rusNumbers(diffMinutes, "минута", "минуты", "минут")
        : "",
    seconds:
      diffSeconds !== 0 ||
      diffMinutes !== 0 ||
      diffHours !== 0 ||
      diffDays !== 0 ||
      diffMonths !== 0 ||
      diffYears !== 0
        ? rusNumbers(diffSeconds, "секунда", "секунды", "секунд")
        : "",
  };
  return timeDifference;
}
