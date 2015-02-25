import Game = require('game');
import Renderer = require('renderer');
import Player = require('player');
import $ = require('jquery');

$(document).ready(function () {
    // Create canvas
    var canvas = document.createElement('canvas');
    // Setup canvas size
    canvas.width = 1024;
    canvas.height = 768;

    // Add to the document
    $(document.body).append(canvas);

    // Start the game when document is loaded
    var renderer = new Renderer(canvas, 20, 20);
    var game = new Game(renderer);

    game.start();
});