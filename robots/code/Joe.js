function foo(gameState) {
    return {
        rotateTurret: "anticlockwise",
        moveTank: Math.random() < 0.8 ? "forwards" : "none",
        rotateTank: Math.random() < 0.8 ? "clockwise" : "none",
        fire: Math.random() < 0.5
    };
}
module.exports = foo;