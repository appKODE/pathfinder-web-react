function isString<T>(val: T) {
  return typeof val === 'string';
}

export function classNames<T>(val: T[]) {
  return val.filter(isString).join(' ');
}
