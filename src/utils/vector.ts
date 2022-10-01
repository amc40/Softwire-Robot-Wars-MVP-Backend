export interface Vector2D {
  x: number;
  y: number;
}

export function getVector(angleRad: number, magnitude: number): Vector2D {
  return {
    x: Math.cos(angleRad) * magnitude,
    y: Math.sin(angleRad) * magnitude,
  };
}

export function addVectors(
  { x: x1, y: y1 }: Vector2D,
  { x: x2, y: y2 }: Vector2D
): Vector2D {
  return { x: x1 + x2, y: y1 + y2 };
}

export function getZeroVector() {
  return { x: 0, y: 0 };
}
