import Renderer = require('renderer');
import Player = require('player');
import Map = require('map');

class Game {
    private _players: Player[];
    private _currentPlayer: Player;
    private _runner: () => void;
    private _map: Map;

    constructor(private _renderer: Renderer) {
        // TODO: Get map from somewhere else
        this._map = new Map(10, 10);

        this._currentPlayer = new Player(2,2);
        this._players = [];
        this._players.push(this._currentPlayer);
    }

    get renderer(): Renderer {
        return this._renderer;
    }

    render(): void {
        var renderer = this.renderer;

        // First map on the background
        renderer.renderMap(this._map);

        // Then players
        this._players.forEach(function (player: Player) {
            renderer.renderPlayer(player);
        });
    }

    start(): void {
        this._runner = this.run.bind(this);
        this.run();
    }

    private run(): void {

        this.render();
        
        // Run the next step on next update
        window.requestAnimationFrame(this._runner);
    }
}

export = Game;