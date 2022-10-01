import { Vector2D } from "../utils/vector";
import { BoundingBox } from "./bounding-element";

export const MAX_POSITION = 1000;

export const PLAY_AREA_BOUNDS: BoundingBox = {
  x: 0,
  y: 0,
  width: MAX_POSITION,
  height: MAX_POSITION,
};

export function getRandomPosition(): Vector2D {
  return {
    x: Math.floor(Math.random() * MAX_POSITION),
    y: Math.floor(Math.random() * MAX_POSITION),
  };
}

export function getRandomAngle(): number {
  return Math.PI * 2 * Math.random();
}
