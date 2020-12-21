interface NameOneTwoManyInterface {
  one: string;
  two: string;
  many: string;
}

function NameOneTwoMany(measure: string): NameOneTwoManyInterface {
  if (measure === "year") {
    return { one: "год", two: "гады", many: "гадоў" };
  }
  if (measure === "month") {
    return { one: "месяц", two: "месяцы", many: "месяцаў" };
  }
  if (measure === "day") {
    return { one: "дзень", two: "дні", many: "дзён" };
  }
  if (measure === "hour") {
    return { one: "гадзіна", two: "гадзіны", many: "гадзін" };
  }
  if (measure === "minute") {
    return { one: "хвіліна", two: "хвіліны", many: "хвілін" };
  }
  if (measure === "second") {
    return { one: "секунда", two: "секунды", many: "секунд" };
  }
  return { one: "", two: "", many: "" };
}

export default function belNumbers(number: number, measure: string): string {
  const name = NameOneTwoMany(measure);

  const numberAbs = Math.abs(number);

  if (
    numberAbs.toString().slice(-1) === "1" &&
    numberAbs.toString().slice(-2, -1) !== "1"
  )
    return `${number} ${name.one}`;
  if (
    (numberAbs.toString().slice(-1) === "2" ||
      numberAbs.toString().slice(-1) === "3" ||
      numberAbs.toString().slice(-1) === "4") &&
    numberAbs.toString().slice(-2, -1) !== "1"
  )
    return `${number} ${name.two}`;
  if (
    numberAbs > 4 ||
    number.toString().slice(-2, -1) === "1" ||
    numberAbs === 0
  )
    return `${number} ${name.many}`;

  return "";
}
