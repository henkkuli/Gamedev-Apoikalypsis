import Game = require('./Game');
import renderer = require('./renderer');
import Keyboard = require('./Keyboard');

class GameCreator implements renderer.RenderLayer {
    private _game: Game;
    private _promise: Promise<any>;
    private _loading: boolean;

    constructor(private _name: string, private _url: string) {
        this._loading = true;
    }

    update(keyboard: Keyboard, handler: renderer.Handler): boolean {
        if (!this._game) {
            // On first update create the game
            this._game = new Game();
            this._promise = this._game.load(this._url);
            this._promise.then(() => this._loading = false);
        }
        if (this._loading) {
            return false;
        } else {
            // Replace GameCreator with the game
            handler.popUntil(this);
            handler.pop();
            handler.push(this._game);
            return false;
        }
    }
    render(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
        // Clear the background
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);

        // Show message telling map is loading
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '50px serif';
        ctx.fillStyle = '#000';
        ctx.fillText('Your map is loading:', 0.5 * width, 0.5 * height - 25);
        ctx.fillText(this._name + ' (' + this._url + ')', 0.5 * width, 0.5 * height + 25);

        // Don't render lower layers
        return false;
    }
}

export = GameCreator; 