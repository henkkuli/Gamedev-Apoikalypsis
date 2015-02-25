import Renderer = require('renderer');

class Game {
    constructor(private _renderer: Renderer) {
    }

    get renderer(): Renderer {
        return this._renderer;
    }
}

export = Game;