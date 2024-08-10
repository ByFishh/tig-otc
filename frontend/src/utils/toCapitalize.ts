export const toCapitalize = (str: string, capitalizeAllWords: boolean = false): string => {
  if (!str) return "";
  let result = "";
  let capitalizeNext = true;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === " ") {
      result += char;
      if (capitalizeAllWords) {
        capitalizeNext = true;
      }
    } else if (capitalizeNext) {
      result += char.toUpperCase();
      capitalizeNext = false;
      if (!capitalizeAllWords) {
        result += str.slice(i + 1).toLowerCase();
        break;
      }
    } else {
      result += char.toLowerCase();
    }
  }

  return result;
};
