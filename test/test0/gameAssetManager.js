var GameAssetManager = function(assets){

    var config = {
        assetTypes: {
            "texture": function(url, asset){
                var loader = new PIXI.ImageLoader(url);
                loader.addEventListener('loaded', function(){
                    asset.data = PIXI.Texture.fromImage(url);
                    asset.done();
                });

                loader.load();
            }
        }
    };

    config.assets = assets;

    UAM.AssetManager.call(this, config);
};

GameAssetManager.prototype = Object.create(UAM.AssetManager.prototype);
GameAssetManager.prototype.constructor = GameAssetManager;