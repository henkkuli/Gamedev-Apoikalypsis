import menu = require('./basemenu');
import $ = require('jquery');
import GameCreator = require('../GameCreator');

class LevelSelectorLayer extends menu.Layer {
    constructor() {
        // Create a simple menu
        $.getJSON('resources/maps.json').done((data: { file: string; name: string; description: string }[]) => {
            var descriptions = [];
            data.forEach((field) => {
                descriptions.push({ caption: field.name, action: [new GameCreator(field.name, field.file)] });
            });

            var selections = menu.Selection.createChainedSelections(descriptions);
            this.components = selections;
            this.selected = selections[0];

        }).fail((err) => {
            var messageLabel = new menu.Label('There was an error while loading the map list');
            var backButton = menu.Selection.createChainedSelections([
                { caption: 'Go back to the main menu', action: [] }
            ])[0];
            this.components = [messageLabel, backButton];
            this.selected = backButton;
        });

        var selections = menu.Selection.createChainedSelections([
            { caption: 'Start game', action: [] }
        ]);

        super([new menu.Label('Loading map list...')], null);
    }
}

export = LevelSelectorLayer; 