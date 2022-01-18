export function transformName(name, firstLetterCapital = false) {
  const _name = firstLetterCapital
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : name;
  return _name.replace(/-/gm, ' ');
}
