export function getVector(
  angleRad: number,
  magnitude: number
): [number, number] {
  return [Math.cos(angleRad) * magnitude, Math.sin(angleRad) * magnitude];
}
