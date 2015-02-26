import Keyboard = require('./Keyboard');

export interface RenderLayer {
    /**
     * Updates the layer state.
     * Returns whether the next layer in the stacks should be updated too.
     * Handler may be used to modify the layer stack.
     * If something is pushed to the stack false should be returned.
     */
    update(keyboard: Keyboard, handler: Handler): boolean;
    /**
     * Renders the current layer.
     * Returns whether the next layer in the stack should also be rendered.
     */
    render(ctx: CanvasRenderingContext2D, width: number, height: number): boolean;
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
    push(arg: RenderLayer|RenderLayer[]): void {
        if (arg instanceof Array) {
            var array = <RenderLayer[]>arg;
            array.forEach((layer) => this.push(layer));
        } else {
            var layer = <RenderLayer>arg;
            this._layerStack.push(layer);
        }
    }
    /**
     * Removes the top most rendering layer from the stack.
     */
    pop(): void {
        this._layerStack.pop();
    }
    /**
     * Removes the top most rendering layer from the stack until it reaches the defined layer. The defined layer is held in the stack.
     */
    popUntil(layer: RenderLayer): void {
        while (this.top !== layer)
            this.pop();
    }
    /**
     * The top of the render stack.
     */
    get top(): RenderLayer {
        if (this._layerStack.length <= 0)
            return null;
        return this._layerStack[this._layerStack.length - 1];
    }

    update(): void {
        if (this._layerStack.length <= 0)
            return;

        for (var i = this._layerStack.length - 1; i >= 0; i--) {
            // Needed in case of stack getting popped
            if (i >= this._layerStack.length)
                i = this._layerStack.length - 1;

            var current = this._layerStack[i];
            if (!current.update(this._keyboard, this))
                break;
        }
    }

    render(): void {
        if (this._layerStack.length <= 0)
            return;
        // Render the top most layer
        for (var i = this._layerStack.length - 1; i >= 0; i--) {
            var current = this._layerStack[i];
            if (!current.render(this._ctx, this._canvas.width, this._canvas.height))
                break;
        }
    }
}