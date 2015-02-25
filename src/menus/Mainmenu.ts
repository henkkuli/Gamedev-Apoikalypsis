import menu = require('./basemenu');
import LevelSelector = require('./LevelSelector');

class MainMenuLayer extends menu.Layer {
    constructor() {
        // Create a simple menu
        var selections = menu.Selection.createChainedSelections([
            { caption: 'Start game', action: [this, new LevelSelector()] },
            { caption: 'About', action: null }
        ]);

        super(selections, selections[0]);
    }
}

export = MainMenuLayer;