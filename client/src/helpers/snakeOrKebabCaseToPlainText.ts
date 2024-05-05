/**
 * @param {Object} object - The object containing the string to transform and the capitalize option
 * @param {string} object.str - The string to transform, can contain snake or kebab case
 * @param {boolean} [object.capitalize=false] - Whether the result should be title case ("Title Case")
 * @returns {string} - The resulting string
 */
export const snakeOrKebabCaseToPlainText = ({
  str,
  capitalize = false,
}: {
  str: string
  capitalize?: boolean
}) => {
  let res = ""
  const charArray = str.split("")

  charArray.forEach((char, index) => {
    if (char === "_" || char === "-") {
      res += " "
      return
    }

    if (capitalize && index > 0 && charArray[index - 1] === "_") {
      res += char.toUpperCase()
      return
    }

    res += char
  })

  return res
}
