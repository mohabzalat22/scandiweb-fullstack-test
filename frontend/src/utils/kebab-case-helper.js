export const  formatToKebabCase = (str) => {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export const  formatToKebabCaseSensitive = (str) => {
  return str.replace(/\s+/g, "-");
}
