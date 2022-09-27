export const MAX_POSITION = 1000;

export function getRandomPosition(): [number, number] {
  return [
    Math.floor(Math.random() * MAX_POSITION),
    Math.floor(Math.random() * MAX_POSITION),
  ];
}

export function getRandomAngle(): number {
  return Math.PI * 2 * Math.random();
}
