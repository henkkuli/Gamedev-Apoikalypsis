import renderer = require('../renderer');
import Keyboard = require('../Keyboard');

export class Layer implements renderer.RenderLayer {
    constructor(private _components: Component[], private _selected: Component) { }

    get components(): Component[] {
        return this._components;
    }
    set components(components: Component[]) {
        this._components = components;
    }
    get selected(): Component {
        return this._selected;
    }
    set selected(selected: Component) {
        this._selected = selected;
    }

    update(keyboard: Keyboard, handler: renderer.Handler): boolean {
        if (!this._selected)
            return false;

        // Ask from the selected what to do
        var ret = this._selected.update(keyboard);
        // Update selected
        this._selected = ret.selected;
        // Test if action should change
        if (ret.action) {
            // Pop this from the stack
            handler.popUntil(this);
            handler.pop();
            // Push action to the stack
            handler.push(ret.action);
        }
        // Don't call updates of other layers
        return false;
    }
    render(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
        // TODO: More sophisiticated placing algorithm
        // Clear the background
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);

        // Compute the center coordinates
        var centerX = 0.5 * width;
        var totalHeight = 0;
        this._components.forEach((component) => totalHeight += component.getHeight(ctx));
        var y = 0.5 * (height - totalHeight);

        // Draw every element centered
        this._components.forEach((component) => {
            var x = centerX - 0.5 * component.getWidth(ctx);
            component.render(ctx, x, y, this._selected);
            y += component.getHeight(ctx);
        });

        // Don't render lower layers
        return false;
    }
}

export interface Component {
    /**
     * Updates the status of the component.
     * Returns next selected item and new actions to replace the menu in case that should happen.
     */
    update(keyboard: Keyboard): { selected: Component; action: renderer.RenderLayer[] };
    // Renders the component.
    render(ctx: CanvasRenderingContext2D, x: number, y: number, selected?: Component): void;
    // Returns the width of the component
    getWidth(ctx: CanvasRenderingContext2D): number;
    // Returns the height of the component
    getHeight(ctx: CanvasRenderingContext2D): number;
}

export class Selection implements Component {
    constructor(private _caption: string, private _action: renderer.RenderLayer[], private _prev: Component, private _next: Component) { }

    get caption(): string {
        return this._caption
    }

    update(keyboard: Keyboard): { selected: Component; action: renderer.RenderLayer[] } {
        // Arrow keys move, enter does the action
        if (keyboard.isKeyHit(Keyboard.Key.Up))
            return { selected: this._prev, action: null };
        if (keyboard.isKeyHit(Keyboard.Key.Down))
            return { selected: this._next, action: null };
        if (keyboard.isKeyHit(Keyboard.Key.Return))
            return { selected: this, action: this._action };
        return { selected: this, action: null };
    }
    render(ctx: CanvasRenderingContext2D, x: number, y: number, selected?: Component): void {
        // Setup fonts
        this.setupFonts(ctx);
        // Use different color if selected
        if (this === selected) {
            ctx.fillStyle = '#f00';
        } else {
            ctx.fillStyle = '#000';
        }
        // Draw text
        ctx.fillText(this.caption, x, y);
    }


    getWidth(ctx: CanvasRenderingContext2D): number {
        this.setupFonts(ctx);
        return ctx.measureText(this._caption).width;
    }
    getHeight(ctx: CanvasRenderingContext2D): number {
        return 50;
    }

    /**
     * Setups fonts for rendering and text measuring.
     */
    private setupFonts(ctx: CanvasRenderingContext2D): void {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = this.getHeight(ctx) + 'px sans-serif';
    }

    /**
     * Creates a list of selections based on the descriptor of their captions and actions.
     */
    public static createChainedSelections(items: { caption: string; action: renderer.RenderLayer[] }[]): Selection[] {
        // Create new dummy selections
        var selections = items.map((item) => new Selection(item.caption, item.action, null, null));
        // Setup prev and next for every selection
        for (var i = 0; i < selections.length; i++) {
            selections[i]._next = selections[(i + 1) % selections.length];
            selections[i]._prev = selections[(i - 1 + selections.length) % selections.length];
        }

        return selections;
    }
}

export class Label implements Component {
    constructor(private _caption: string) { }

    get caption(): string {
        return this._caption
    }

    update(keyboard: Keyboard): { selected: Component; action: renderer.RenderLayer[] } {
        // Arrow keys move, enter does the action
        return { selected: this, action: null };
    }
    render(ctx: CanvasRenderingContext2D, x: number, y: number, selected?: Component): void {
        // Setup fonts
        this.setupFonts(ctx);
        // Draw text
        ctx.fillText(this.caption, x, y);
    }


    getWidth(ctx: CanvasRenderingContext2D): number {
        this.setupFonts(ctx);
        return ctx.measureText(this._caption).width;
    }
    getHeight(ctx: CanvasRenderingContext2D): number {
        return 60;
    }

    /**
     * Setups fonts for rendering and text measuring.
     */
    private setupFonts(ctx: CanvasRenderingContext2D): void {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = this.getHeight(ctx) + 'px serif';
        ctx.fillStyle = '#000';
    }
}