interface NameOneTwoManyInterface {
  one: string;
  two: string;
  many: string;
}

function NameOneTwoMany(measure: string): NameOneTwoManyInterface {
  if (measure === "year") {
    return { one: "год", two: "года", many: "лет" };
  }
  if (measure === "month") {
    return { one: "месяц", two: "месяца", many: "месяцев" };
  }
  if (measure === "day") {
    return { one: "день", two: "дня", many: "дней" };
  }
  if (measure === "hour") {
    return { one: "час", two: "часа", many: "часов" };
  }
  if (measure === "minute") {
    return { one: "минута", two: "минуты", many: "минут" };
  }
  if (measure === "second") {
    return { one: "секунда", two: "секунды", many: "секунд" };
  }
  return { one: "", two: "", many: "" };
}

export default function rusNumbers(number: number, measure: string): string {
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
