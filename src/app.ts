import Game = require('./game');
import renderer = require('./renderer');
import Player = require('./player');
import Keyboard = require('./keyboard');
import Mainmenu = require('./menus/Mainmenu');
import $ = require('jquery');

$(document).ready(function () {
    // Create canvas
    var canvas = document.createElement('canvas');
    // Setup canvas size
    canvas.width = 1024;
    canvas.height = 768;

    // Add to the document
    $(document.body).append($(canvas));

    // Prepare rendering engine
    var keyboard = new Keyboard($(document.body));
    var renderHandler = new renderer.Handler(canvas, keyboard);
    renderHandler.push(new Mainmenu());

    var runner = () => {
        renderHandler.update();
        renderHandler.render();

        window.requestAnimationFrame(runner);
    };

    runner();

    // Start the game when document is loaded
    //var renderer = new Renderer(canvas, 20, 20);
    //var game = new Game(renderer, keyboard);

    //game.resourcePromise.then(() => {
    //    game.start();
    //});

});