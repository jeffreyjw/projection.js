(function(){
    var screen = document.getElementById("screen");

    var renderer = PIXI.autoDetectRenderer(800, 500);
    screen.appendChild(renderer.view);

    var stage = new PIXI.Stage(0x4444DD);

    var keyboard = new GAMEKBD.Keyboard();

    var assets = {
        "texture": [
            'bg.png'
        ]
    };
    var assetManager = new GameAssetManager(assets);
    assetManager.onload = function(){
        var tex = assetManager.get('bg.png');
        var bg = new PIXI.Sprite(tex);

        bg.position.x = 400;
        bg.position.y = 250;
        bg.anchor.x = 0.5;
        bg.anchor.y = 0.5;
        bg.tint = 0xFF0000;

        stage.addChild(bg);

        var animate = function()
        {
            bg.rotation += 0.01;
            var s = 0.5 + 0.5*Math.abs(Math.sin(bg.rotation));
            bg.scale.x = s;
            bg.scale.y = s;

            if (keyboard.isKeyPressed(GAMEKBD.Keys.KEY_R))
            {
                bg.tint = 0xFF0000;
            }
            if (keyboard.isKeyPressed(GAMEKBD.Keys.KEY_G))
            {
                bg.tint = 0x00FF00;
            }
            if (keyboard.isKeyPressed(GAMEKBD.Keys.KEY_B))
            {
                bg.tint = 0x0000FF;
            }

            keyboard.update();

            renderer.render(stage);
        };

        TweenLite.ticker.addEventListener("tick", animate);
    };
    assetManager.load();


})();