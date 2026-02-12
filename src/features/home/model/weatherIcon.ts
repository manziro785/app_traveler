export type WeatherCategory = "sunny" | "cloudy" | "precipitation" | "other";

const SUNNY_KEYWORDS = ["ясно", "ясная погода", "безоблачно", "солнечно"];

const CLOUDY_KEYWORDS = [
  "переменная облачность",
  "малооблачно",
  "облачно с прояснениями",
  "облачно",
  "пасмурно",
];

const PRECIPITATION_KEYWORDS = [
  "небольшой дождь",
  "дождь",
  "сильный дождь",
  "очень сильный дождь",
  "местами дождь",
  "ливень",
  "сильный ливень",
  "небольшой снег",
  "снег",
  "сильный снег",
  "снегопад",
  "небольшой снегопад",
  "сильный снегопад",
  "дождь со снегом",
  "мокрый снег",
  "небольшой дождь со снегом",
  "гроза",
  "гроза с дождем",
  "гроза с дождём",
  "гроза с сильным дождем",
  "гроза с сильным дождём",
  "небольшая гроза",
];

function normalize(text: string): string {
  return text.toLowerCase().replaceAll("ё", "е").trim();
}

function containsAny(haystack: string, needles: string[]): boolean {
  return needles.some((keyword) => haystack.includes(normalize(keyword)));
}

export function detectWeatherCategory(text?: string | null): WeatherCategory {
  const normalized = normalize(text ?? "");
  if (!normalized) return "other";

  if (containsAny(normalized, PRECIPITATION_KEYWORDS)) return "precipitation";
  if (containsAny(normalized, CLOUDY_KEYWORDS)) return "cloudy";
  if (containsAny(normalized, SUNNY_KEYWORDS)) return "sunny";

  return "other";
}
