import { BoundingBox } from "../internal";

export const MAX_POSITION = 1000;

export const PLAY_AREA_BOUNDS: BoundingBox = {
  x: 0,
  y: 0,
  width: MAX_POSITION,
  height: MAX_POSITION,
};

export function getRandomPosition(): [number, number] {
  return [
    Math.floor(Math.random() * MAX_POSITION),
    Math.floor(Math.random() * MAX_POSITION),
  ];
}

export function getRandomAngle(): number {
  return Math.PI * 2 * Math.random();
}
