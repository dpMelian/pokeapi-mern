export const firstLetterToUpperCase = (string = ""): string =>
  string[0]?.toUpperCase() + string.slice(1).toLowerCase()
