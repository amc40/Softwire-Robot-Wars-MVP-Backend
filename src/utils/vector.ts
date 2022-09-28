export function getVector(
  angleRad: number,
  magnitude: number
): [number, number] {
  return [Math.cos(angleRad) * magnitude, Math.sin(angleRad) * magnitude];
}

export function addVectors(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): [number, number] {
  return [x1 + x2, y1 + y2];
}
