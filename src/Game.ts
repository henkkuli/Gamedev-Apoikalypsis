import Renderer = require('./renderer');
import Player = require('./Player');
import Enemy = require('./Enemy');
import Entity = require('./Entity');
import ImagedEntity = require('./ImagedEntity');
import Map = require('./Map');
import Keyboard = require('./Keyboard');
import renderer = require('./renderer');
import GameRenderer = require('./GameRenderer');

class Game implements Renderer.RenderLayer {
    private _entities: Entity[];
    private _currentPlayer: Player;
    private _runner: () => void;
    private _map: Map;
    private _lastUpdate: number;
    private _renderer: GameRenderer;

    constructor() {
        // Initialize variables
        this._entities = [];
        this._renderer = new GameRenderer(30, 30);
    }

    load(mapUrl: string): Promise<any> {
        // Load map
        this._map = new Map();
        var mapPromise = this._map.load(mapUrl);

        var playerImagePromise = this.loadImage('img/player1.png');
        var enemyImagePromise = this.loadImage('img/enemy1.png');

        playerImagePromise.then((image: HTMLImageElement) => {
            this._currentPlayer = new Player(2, 2, image);
            this._entities.push(this._currentPlayer);
        });
        Promise.all(<Promise<any>[]>[mapPromise, enemyImagePromise]).then((value: any[]) => {
            var image: HTMLImageElement = value[1];
            for (var i = 0; i < 10; i++) {
                this._entities.push(new Enemy(Math.random() * (this._map.width - 1), Math.random() * (this._map.height - 1), image));
            }
        });

        return Promise.all(<Promise<any>[]>[mapPromise, playerImagePromise, enemyImagePromise]);
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve: (image: HTMLImageElement) => void, reject: (err) => void) => {
            var image = new Image();
            image.addEventListener('load',() => {
                resolve(image);
            });
            image.src = url;
        });
    }

    update(keyboard: Keyboard, handler: renderer.Handler): boolean {
        var now = new Date().getTime();
        var delta = (now - this._lastUpdate) / 1000;
        this._lastUpdate = now;

        var speed = delta * 5;
        if (keyboard.isKeyDown(Keyboard.Key.Left))
            this._currentPlayer.move(-speed, 0);
        if (keyboard.isKeyDown(Keyboard.Key.Right))
            this._currentPlayer.move(speed, 0);
        if (keyboard.isKeyDown(Keyboard.Key.Up))
            this._currentPlayer.move(0, -speed);
        if (keyboard.isKeyDown(Keyboard.Key.Down))
            this._currentPlayer.move(0, speed);

        return false;
    }

    render(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
        var renderer = this._renderer;

        // First map on the background
        renderer.renderMap(ctx, this._map, width, height);

        // Then entities
        this._entities.forEach(function (entity: Entity) {
            if (entity instanceof ImagedEntity) {
                renderer.renderImagedEntity(ctx, <ImagedEntity> entity, width, height);
            }
        });

        // Don't render lower layers
        return false;
    }
}

export = Game;