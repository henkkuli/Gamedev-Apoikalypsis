import Entity = require('./Entity');

class ImagedEntity extends Entity {
    constructor(x: number, y: number, width: number, height: number, private _image: HTMLImageElement) {
        super(x, y, width, height);
    }
    
    get image(): HTMLImageElement {
        return this._image;
    }
    
}

export = ImagedEntity;
