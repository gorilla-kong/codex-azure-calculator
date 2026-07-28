export function add(x, y) {
  const first = Number(x);
  const second = Number(y);

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new TypeError("Both x and y must be valid finite numbers.");
  }

  return first + second;
}
