export function buildClassName(object: {}, advanced?: string) {
  return Object.keys(object)
    .filter((key) => object[key])
    .map((key) => key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())
    .join(' ')
    + (advanced ? ' ' + advanced : '');
}
