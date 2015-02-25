import Entity = require('entity');

class Player extends Entity {
    constructor(x: number, y: number) { super(x, y, 0.5, 0.5); }
}

export = Player;