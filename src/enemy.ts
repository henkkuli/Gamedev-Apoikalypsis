import ImagedEntity = require('imagedEntity');

class Enemy extends ImagedEntity {
    constructor(x: number, y: number, image: HTMLImageElement) { super(x, y, 1, 1, image); }
}

export = Enemy;