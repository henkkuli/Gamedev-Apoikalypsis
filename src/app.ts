import Game = require('game');
import Renderer = require('renderer');
import Player = require('player');
import $ = require('jquery');

$(document).ready(function () {
    // Create canvas
    var canvas = document.createElement('canvas');
    // Add to the document
    $(document.body).append(canvas);

    // Start the game when document is loaded
    var renderer = new Renderer(canvas);
    var game = new Game(renderer);

    renderer.draw();
});