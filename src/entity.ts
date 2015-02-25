class Entity {

    constructor(public x: number, public y: number, public width: number, public height: number) { }

    move(x: number, y: number) {
        this.x += x;
        this.y += y;
    }
}

export = Entity;