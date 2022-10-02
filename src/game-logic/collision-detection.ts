import { BoundingBox, BoundingCircle } from "../models/bounding-element";
import { LineSegment } from "../utils/geometry";
import { crossProduct, diffVectors, getUnitVector } from "../utils/vector";

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

// function doesLineSegmentCollideWithCircle(
//   lineSegment: LineSegment,
//   circle: BoundingCircle
// ): boolean {
//   // from https://stackoverflow.com/a/9053697
//   const delta = diffVectors(lineSegment.B, lineSegment.A);
//   const unitDelta = getUnitVector(delta);
//   const d = crossProduct(diffVectors(circle, lineSegment.A), unitDelta);
//   if (Math.abs(d) > circle.radius) {
//     return false;
//   }

// }
