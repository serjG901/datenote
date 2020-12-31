import nameMeasureViaNumberAndLanguage from "./nameMeasureViaNumberAndLanguage";

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
  dateNow: number,
  dateNote: number,
  currentLanguage: string,
  passedViaLanguage: string,
  nowViaLanguage: string,
  leftViatLanguage: string
): getTimeDifferenceInterface {
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

  let diffTime = (dateNow - dateNote) / 1000;

  const monthForCorrection = diffTime > 0 ? monthsNote : monthsNow;
  const yearForCorrection = diffTime > 0 ? yearsNote : yearsNow;

  const daysInMonthForCorrection =
    monthForCorrection === 3 ||
    monthForCorrection === 5 ||
    monthForCorrection === 8 ||
    monthForCorrection === 10
      ? 30
      : monthForCorrection === 2 && yearForCorrection % 4 === 0
      ? 29
      : monthForCorrection === 2 && yearForCorrection % 4 !== 0
      ? 27
      : 31;

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
  diffDays = diffDays < 0 ? daysInMonthForCorrection + diffDays : diffDays;
  diffHours = diffHours < 0 ? 24 + diffHours : diffHours;
  diffMinutes = diffMinutes < 0 ? 60 + diffMinutes : diffMinutes;
  diffSeconds = diffSeconds < 0 ? 60 + diffSeconds : diffSeconds;

  const timeDifference = {
    explane:
      diffTime === 0
        ? nowViaLanguage
        : diffTime > 0
        ? passedViaLanguage
        : leftViatLanguage,
    years:
      diffYears !== 0
        ? nameMeasureViaNumberAndLanguage(
            diffYears,
            "year",
            currentLanguage
          )
        : "",
    months:
      diffMonths !== 0 || diffYears !== 0
        ? nameMeasureViaNumberAndLanguage(
            diffMonths,
            "month",
            currentLanguage
          )
        : "",
    days:
      diffDays !== 0 || diffMonths !== 0 || diffYears !== 0
        ? nameMeasureViaNumberAndLanguage(diffDays, "day", currentLanguage)
        : "",
    hours:
      diffHours !== 0 || diffDays !== 0 || diffMonths !== 0 || diffYears !== 0
        ? nameMeasureViaNumberAndLanguage(
            diffHours,
            "hour",
            currentLanguage
          )
        : "",
    minutes:
      diffMinutes !== 0 ||
      diffHours !== 0 ||
      diffDays !== 0 ||
      diffMonths !== 0 ||
      diffYears !== 0
        ? nameMeasureViaNumberAndLanguage(
            diffMinutes,
            "minute",
            currentLanguage
          )
        : "",
    seconds:
      diffSeconds !== 0 ||
      diffMinutes !== 0 ||
      diffHours !== 0 ||
      diffDays !== 0 ||
      diffMonths !== 0 ||
      diffYears !== 0
        ? nameMeasureViaNumberAndLanguage(
            diffSeconds,
            "second",
            currentLanguage
          )
        : "",
  };
  return timeDifference;
}
