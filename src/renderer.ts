import Player = require('player');
import Map = require('map');

class Renderer {
    private _ctx: CanvasRenderingContext2D;

    constructor(private _canvas: HTMLCanvasElement, private _tileWidth: number, private _tileHeight: number) {
        this._ctx = this._canvas.getContext('2d');
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }
    get width(): number {
        return this._canvas.width;
    }
    get height(): number {
        return this._canvas.height;
    }
    get tileWidth(): number {
        return this._tileWidth;
    }
    get tileHeight(): number {
        return this._tileHeight;
    }

    renderPlayer(player: Player): void {
        var x = (player.x + 1) * this.tileWidth;
        var y = (player.y + 1) * this.tileHeight;
        var w = player.width * this.tileWidth;
        var h = player.height * this.tileHeight;

        this.ctx.drawImage(player.image, x - 0.5 * w, y - 0.5 * h, w, h);

        //this.ctx.fillStyle = '#00f';
        //this.ctx.beginPath();
        //this.ctx.arc(x, y,(player.width * this.tileWidth + player.height * this.tileHeight) * 0.25, 0, 2 * Math.PI, false);
        //this.ctx.fill();
    }

    renderMap(map: Map): void {
        for (var x = -1; x * this.tileWidth < this.width; x++) {
            for (var y = -1; y * this.tileHeight < this.height; y++) {
                var tile = map.getTile(x, y);
                // Setup styles based on the tile
                switch (tile) {
                    case Map.Tile.Wall:
                        this.ctx.fillStyle = '#fa0';
                        this.ctx.strokeStyle = '#fff';
                        break;
                    case Map.Tile.Floor:
                        this.ctx.fillStyle = '#efe';
                        this.ctx.strokeStyle = '#000';
                        break;

                    default:
                        this.ctx.fillStyle = '#f0f';
                        this.ctx.strokeStyle = '#fff';
                        break;
                }
                // Draw the tile
                this.ctx.fillRect(
                    (x + 0.5) * this.tileWidth,
                    (y + 0.5) * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight);
                this.ctx.strokeRect(
                    (x + 0.5) * this.tileWidth,
                    (y + 0.5) * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight);
            }
        }
    }

}

export = Renderer;