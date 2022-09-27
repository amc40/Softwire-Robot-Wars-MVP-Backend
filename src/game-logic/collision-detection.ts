import { BoundingBox, BoundingCircle } from "../models/bounding-element";

export function doesCircleCollideWithBox(
  circle: BoundingCircle,
  box: BoundingBox
) {
  // from http://jeffreythompson.org/collision-detection/circle-rect.php
  let testX = circle.x;
  let testY = circle.y;
  if (circle.x < box.x) {
    testX = box.x; // left edge
  } else if (circle.x > box.x + box.width) {
    testX = box.x + box.width; // right edge
  }

  if (circle.y < box.y) {
    testY = box.y; // top edge
  } else if (circle.y > box.y + box.height) {
    testY = box.y + box.height; // bottom edge
  }

  const distX = circle.x - testX;
  const distY = circle.y - testY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= circle.radius) {
    return true;
  }
  return false;
}
