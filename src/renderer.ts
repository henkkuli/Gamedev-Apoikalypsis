import Keyboard = require('./keyboard');

export interface RenderLayer {
    /**
     * Updates the layer state.
     * Returns list of layers which will replace the current layer.
     * If nothing should happen, update should return [this].
     */
    update(keyboard: Keyboard): RenderLayer[];
    /**
     * Renders the current layer
     */
    render(ctx: CanvasRenderingContext2D, width: number, height: number): void;
}

/**
 * Implements a render layer stack.
 * Rendering layers can be pushed with .push() and popped with .pop().
 * Update method calls the update method of the top most layer.
 * Render method calls the render method of the top most layer.
 */
export class Handler {
    private _layerStack: RenderLayer[];
    private _ctx: CanvasRenderingContext2D;

    constructor(private _canvas: HTMLCanvasElement, private _keyboard: Keyboard) {
        // Get the rendering context
        this._ctx = this._canvas.getContext('2d');
        // Initialize the stack
        this._layerStack = [];
    }

    /**
     * Adds a new rendering layer to the top of the stack.
     */
    push(layer: RenderLayer): void {
        this._layerStack.push(layer);
    }
    /**
     * Removes the top most rendering layer from the stack.
     */
    pop(): void {
        this._layerStack.pop();
    }

    update(): void {
        if (this._layerStack.length <= 0)
            return;
        // Pop the top most layer and call its update method
        var oldTop = this._layerStack.pop();
        var toPush = oldTop.update(this._keyboard);
        // Push returned actions back to the stack
        if (!toPush.forEach)
            console.log(toPush);
        toPush.forEach((layer) => this._layerStack.push(layer));
        // If the top has changed run its update also
        if (this._layerStack[this._layerStack.length - 1] !== oldTop)
            this.update();
    }

    render(): void {
        if (this._layerStack.length <= 0)
            return;
        // Render the top most layer
        this._layerStack[this._layerStack.length - 1].render(this._ctx, this._canvas.width, this._canvas.height);
    }
}