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

export function diffVectors(
  { x: x1, y: y1 }: Vector2D,
  { x: x2, y: y2 }: Vector2D
) {
  return { x: x1 - x2, y: y1 - y2 };
}

export function getZeroVector(): Vector2D {
  return { x: 0, y: 0 };
}

export function getVectorNorm({ x, y }: Vector2D): number {
  return Math.sqrt(x ** 2 + y ** 2);
}

export function getUnitVector(baseVector: Vector2D): Vector2D {
  const norm = getVectorNorm(baseVector);
  return { x: baseVector.x / norm, y: baseVector.y / norm };
}

export function crossProduct(
  { x: x1, y: y1 }: Vector2D,
  { x: x2, y: y2 }: Vector2D
): number {
  return x1 * y2 - x2 * y1;
}
