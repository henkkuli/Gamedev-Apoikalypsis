import Renderer = require('renderer');
import Player = require('player');
import Map = require('map');
import Keyboard = require('keyboard');

class Game {
    private _players: Player[];
    private _currentPlayer: Player;
    private _runner: () => void;
    private _map: Map;
    private _lastUpdate: number;

    constructor(private _renderer: Renderer, private _keyboard: Keyboard) {
        // TODO: Get map from somewhere else
        this._map = new Map(10, 10);

        var playerImg = new Image();
        playerImg.src = 'img/player1.png';
        this._currentPlayer = new Player(2, 2, playerImg);
        this._players = [];
        this._players.push(this._currentPlayer);
    }

    get renderer(): Renderer {
        return this._renderer;
    }

    update(delta: number): void {
        var speed = delta * 5;
        if (this._keyboard.isKeyDown(Keyboard.Key.Left))
            this._currentPlayer.move(-speed, 0);
        if (this._keyboard.isKeyDown(Keyboard.Key.Right))
            this._currentPlayer.move(speed, 0);
        if (this._keyboard.isKeyDown(Keyboard.Key.Up))
            this._currentPlayer.move(0, -speed);
        if (this._keyboard.isKeyDown(Keyboard.Key.Down))
            this._currentPlayer.move(0, speed);
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
        // Create the runner
        this._runner = this.run.bind(this);
        // And run the first step which will continue running
        this._lastUpdate = new Date().getTime();
        this.run();
    }

    private run(): void {
        var now = new Date().getTime();
        var delta = (now - this._lastUpdate) / 1000;
        this._lastUpdate = now;

        // Game loop
        this.update(delta);
        this.render();
        
        // Continue the game loop
        window.requestAnimationFrame(this._runner);
    }
}

export = Game;