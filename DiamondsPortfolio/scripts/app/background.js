/* Create our background */

//DiamondFactory

//This function returns a Kinetic.Polygon with my default diamond points, and can be overloaded to pass normal KineticJS Polygon config

var DiamondFactory = function () {

    //Our default points
    var defaultConfig = {
        points: mainOptions.diamondPoints,
        fillPatternOffset: mainOptions.fillPatternOffset
    };

    return{

        buildDiamond: function (config) {

            //Merge our config
            var diamondConfig = $.extend({}, defaultConfig, config);

            //Create our Polygon
            var diamond = new Kinetic.Polygon(diamondConfig);

            //Return our Polygon
            return diamond;
        }
    };
}

//createBackgroundLayer creates a layer, a background diamond, and then adds the diamond to the layer and the layer to the stage 

var createBackgroundLayer = function (images, stage) {

    var backgroundLayer = new Kinetic.Layer({
        name : "BackgroundLayer"
    });

    var backgroundDiamond = new DiamondFactory().buildDiamond({
        fillPatternImage: images.backgroundImage
    });

    backgroundLayer.add(backgroundDiamond);
    stage.add(backgroundLayer);
}

//createBackground is our stage function to create our background.

Kinetic.Stage.prototype.createBackground = function(images){
    createBackgroundLayer(images, this);
}

/* End Create Background */
