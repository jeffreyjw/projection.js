(function(){
    var screen = document.getElementById("screen");

    var renderer = PIXI.autoDetectRenderer(800, 500);
    screen.appendChild(renderer.view);

    var stage = new PIXI.Stage(0x4444DD);

    var keyboard = new GAMEKBD.Keyboard();
    var camera = new PROJECTION.Camera(45, 8/5, 1, 100);

    var tex = PIXI.Texture.fromImage('square.png')
    var bg = new PIXI.Sprite(tex);

    var bgPos = [0, 0, 0];

    bg.position.x = 400;
    bg.position.y = 250;
    bg.anchor.x = 0.5;
    bg.anchor.y = 0.5;

    stage.addChild(bg);

    var animate = function()
    {
        var newPos = camera.transform(bgPos);
        var s = 1/newPos[2];
        bg.scale.x = s;
        bg.scale.y = s;
        bg.position.x = 400 + newPos[0]|0;
        bg.position.y = 250 + newPos[1]|0;

        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_W))
        {
            bgPos[2] -= 1;
        }
        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_S))
        {
            bgPos[2] += 1;
        }
        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_A))
        {
            bgPos[0] -= 1;
        }
        if (keyboard.isKeyDown(GAMEKBD.Keys.KEY_D))
        {
            bgPos[0] += 1;
        }

        keyboard.update();

        renderer.render(stage);
    };

    TweenLite.ticker.addEventListener("tick", animate);


})();