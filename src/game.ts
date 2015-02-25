import Renderer = require('renderer');
import Player = require('player');

class Game {
    _players: Player[];
    _currentPlayer: Player;
    constructor(private _renderer: Renderer) {
    }

    get renderer(): Renderer {
        return this._renderer;
    }

    render(): void {
        var renderer = this.renderer;
        this._players.forEach(function (player: Player) {
            renderer.renderPlayer(player);
        });
    }
}

export = Game;