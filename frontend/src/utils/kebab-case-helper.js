export default function formatToKebabCase(str) {
  str.toLowerCase().replace(/\s+/g, "-");
}
