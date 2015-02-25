import $ = require('jquery');

class Keyboard {
    private _keysDown: boolean[];
    private _keysHit: boolean[];

    constructor(container: JQuery) {
        this._keysDown = new Array(256);
        this._keysHit = new Array(256);

        container.keydown(this.onKeyDown.bind(this));
        container.keyup(this.onKeyUp.bind(this));
    }

    isKeyDown(keycode: Keyboard.Key): boolean {
        return this._keysDown[keycode];
    }
    isKeyHit(keycode: Keyboard.Key): boolean {
        var val = this._keysHit[keycode];
        this._keysHit[keycode] = false;
        return val;
    }

    private onKeyDown(e: JQueryKeyEventObject): void {
        if (!this._keysDown[e.keyCode])
            this._keysHit[e.keyCode] = true;
        this._keysDown[e.keyCode] = true;
        e.preventDefault();
    }
    private onKeyUp(e: JQueryKeyEventObject): void {
        this._keysDown[e.keyCode] = false;
        e.preventDefault();
    }
}

module Keyboard {
    export enum Key {
        Back = 8,
        Tab = 9,
        Return = 13,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        CapsLock = 20,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        Left = 37,
        Up = 38,
        Right = 39,
        Down = 40,
        Insert = 45,
        Delete = 46,
        // Numbers
        Number0 = 48,
        Number1 = 49,
        Number2 = 50,
        Number3 = 51,
        Number4 = 52,
        Number5 = 53,
        Number6 = 54,
        Number7 = 55,
        Number8 = 56,
        Number9 = 57,
        // Letters
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        // Numpad
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99,
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        Multiply = 106,
        Add = 107,
        Substract = 109,
        DecimalPoint = 110,
        Divide = 111,
        // Function keys
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
    }
}

export = Keyboard;