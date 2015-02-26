import ImagedEntity = require('./ImagedEntity');
import Map = require('./Map');

class GameRenderer {
    constructor(private _tileWidth: number, private _tileHeight: number) { }

    get tileWidth(): number {
        return this._tileWidth;
    }
    get tileHeight(): number {
        return this._tileHeight;
    }

    renderImagedEntity(ctx: CanvasRenderingContext2D, entity: ImagedEntity, width: number, height: number): void {
        var x = (entity.x + 1) * this.tileWidth;
        var y = (entity.y + 1) * this.tileHeight;
        var w = entity.width * this.tileWidth;
        var h = entity.height * this.tileHeight;

        ctx.drawImage(entity.image, x - 0.5 * w, y - 0.5 * h, w, h);

    }

    renderMap(ctx: CanvasRenderingContext2D, map: Map, width: number, height: number): void {
        for (var x = -1; x * this.tileWidth < width; x++) {
            for (var y = -1; y * this.tileHeight < height; y++) {
                var tile = map.getTile(x, y);
                // Setup styles based on the tile
                switch (tile) {
                    case Map.Tile.Wall:
                        ctx.fillStyle = '#fa0';
                        ctx.strokeStyle = '#fff';
                        break;
                    case Map.Tile.Floor:
                        ctx.fillStyle = '#efe';
                        ctx.strokeStyle = '#000';
                        break;

                    default:
                        console.log(tile + ': ' + Map.Tile[tile]);
                        ctx.fillStyle = '#f0f';
                        ctx.strokeStyle = '#fff';
                        break;
                }
                // Draw the tile
                ctx.fillRect(
                    (x + 0.5) * this.tileWidth,
                    (y + 0.5) * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight);
                ctx.strokeRect(
                    (x + 0.5) * this.tileWidth,
                    (y + 0.5) * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight);
            }
        }
    }

}

export = GameRenderer;
 