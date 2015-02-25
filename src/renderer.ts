import ImagedEntity = require('imagedEntity');
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

    renderImagedEntity(entity: ImagedEntity): void {
        var x = (entity.x + 1) * this.tileWidth;
        var y = (entity.y + 1) * this.tileHeight;
        var w = entity.width * this.tileWidth;
        var h = entity.height * this.tileHeight;

        this.ctx.drawImage(entity.image, x - 0.5 * w, y - 0.5 * h, w, h);

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