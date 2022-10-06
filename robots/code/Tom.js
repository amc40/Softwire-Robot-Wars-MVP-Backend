function foo(gameState) {
    return {
        rotateTurret: "none",
        moveTank: Math.random() < 0.1 ? "forwards" : "none",
        rotateTank: "none",
        fire: Math.random() < 0.2
    };
}
module.exports = foo;