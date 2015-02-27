import BaseMenu = require('./BaseMenu');
import $ = require('jquery');
import GameCreator = require('../GameCreator');

class LevelSelectorLayer extends BaseMenu {
    constructor() {
        // Create a simple menu
        $.getJSON('resources/maps.json').done((data: { file: string; name: string; description: string }[]) => {
            var descriptions = [];
            data.forEach((field) => {
                descriptions.push({ caption: field.name, action: [new GameCreator(field.name, field.file)] });
            });

            var selections = BaseMenu.Selection.createChainedSelections(descriptions);
            this.components = selections;
            this.selected = selections[0];

        }).fail((err) => {
            var messageLabel = new BaseMenu.Label('There was an error while loading the map list');
            var backButton = BaseMenu.Selection.createChainedSelections([
                { caption: 'Go back to the main menu', action: [] }
            ])[0];
            this.components = [messageLabel, backButton];
            this.selected = backButton;
        });

        var selections = BaseMenu.Selection.createChainedSelections([
            { caption: 'Start game', action: [] }
        ]);

        super([new BaseMenu.Label('Loading map list...')], null);
    }
}

export = LevelSelectorLayer; 