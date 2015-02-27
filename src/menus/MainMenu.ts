import BaseMenu = require('./BaseMenu');
import LevelSelector = require('./LevelSelector');

class MainMenuLayer extends BaseMenu {
    constructor() {
        // Create a simple menu
        var selections = BaseMenu.Selection.createChainedSelections([
            { caption: 'Start game', action: [this, new LevelSelector()] },
            { caption: 'About', action: null }
        ]);

        super(selections, selections[0]);
    }
}

export = MainMenuLayer;