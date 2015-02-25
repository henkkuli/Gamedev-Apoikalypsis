import Player = require('player');

class Renderer {
    private _ctx: CanvasRenderingContext2D;

    constructor(private _canvas: HTMLCanvasElement) {
        this._ctx = this._canvas.getContext('2d');
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    draw(): void {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(20, 100);
        ctx.lineTo(30, 20);
        ctx.fill();
    }

    renderPlayer(player: Player): void {
        
    }

}

export = Renderer