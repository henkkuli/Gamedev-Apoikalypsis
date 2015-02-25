import $ = require('jquery');

class Map {
    private _width: number;
    private _height: number;
    private _data: Map.Tile[][];
    private _loadPromise: Promise<Map>;

    constructor() {
        // Signal not loaded
        this._width = this._height = -1;
    }

    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }

    getTile(x: number, y: number): Map.Tile {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height)
            return Map.Tile.Wall;
        // TODO: Save actual map
        return this._data[y][x];
    }

    load(url: string): Promise<Map> {
        return new Promise<Map>((resolve: (value: Map) => void, reject: (err) => void) => {
            $.get(url).done((data) => {
                this.importFromString(data);
                resolve(this);
            }).fail((err) => {
                reject(err);
            });
        });
    }

    private importFromString(str: string): void {
        this._data = [];

        // Split data to lines
        var lines = str.split('\n');
        for (var y = 0; y < lines.length; y++) {
            this._data.push([]);
            var line = lines[y].trim();
            for (var x = 0; x < line.length; x++) {
                // Get current character and map it to a tile
                var char = line.charAt(x);
                var tile: Map.Tile;
                switch (char) {
                    case '#': tile = Map.Tile.Wall; break;
                    case '.': tile = Map.Tile.Floor; break;
                    default: tile = Map.Tile.Wall;
                }
                // Insert tile to data
                this._data[y].push(tile);
            }
        }

        // Get map size
        this._width = this._data[0].length;
        this._height = this._data.length;
    }
}

module Map {
    export enum Tile {
        Wall, Floor
    }
}

export = Map; 