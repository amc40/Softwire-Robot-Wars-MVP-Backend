import { Vector2D } from "../utils/vector";

export class GameEvent {
    type: string
    constructor(type: string) {
        this.type = type;
    }
  } 

  export class PlayerHitEvent extends GameEvent {
    position: Vector2D
    constructor(position: Vector2D) {
        super("player_hit_event");
        this.position = position;
    }
  }