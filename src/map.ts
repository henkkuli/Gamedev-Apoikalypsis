class Map {
    constructor(public _width: number, public _height: number) { }

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
        return Map.Tile.Floor;
    }
}

module Map {
    export enum Tile {
        Wall, Floor
    }
}

export = Map; 