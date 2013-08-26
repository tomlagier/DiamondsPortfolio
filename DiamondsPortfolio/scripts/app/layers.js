function createLayers(images, sources, stage) {
    
    stage.createBackground(images);
    stage.createSectionsLayer(images);
    createDefaultInfo(stage);

    LayerPublisher(stage);

    hideLoader();

}

function hideLoader(){
    $('.loaderWrapper').animate({opacity: 0}, 200, 'swing', function () {
        $('.loaderWrapper').hide();
        $('#portfolioCanvas').show();
        $('#portfolioCanvas').animate({opacity: 1}, 200);
    });
}

var LayerPublisher = function (stage){

        stage.publishing = false;


        stage.sectionsLayer.on("mouseover touchstart", function(event){

            if (stage.publishing == false){
                throttledPublish(event, stage);
                stage.publishing = true;
            }

        });

        stage.sectionsLayer.on("mouseout touchend", function(event){

            throttledUnpublish(stage);
            stage.publishing = false;

        });
};

function createInfoSection(targetSection, stage){

    var layers = stage.get(".InfoSectionLayer");

    layers.each(function(layer){
        layer.remove();
    });

    var infoSectionLayer = new Kinetic.Layer({
        name: 'InfoSectionLayer'
    });

    var textOptions = getTextOptions(targetSection);
    var lineOptions = getLineOptions(targetSection);
    
    stage.add(infoSectionLayer);

    drawText(infoSectionLayer, textOptions);
    drawLines(infoSectionLayer, lineOptions);

}



function createDefaultInfo(stage){


    var layers = stage.get(".DefaultInfoSection");

    layers.each(function(layer){
        layer.remove();
    });

    var defaultInfoSectionLayer = new Kinetic.Layer({
        name: 'DefaultInfoSectionLayer'
    });

    var textOptions = getDefaultTextOptions();
    var lineOptions = getDefaultLineOptions();

    stage.add(defaultInfoSectionLayer);
    
    drawText(defaultInfoSectionLayer, textOptions);
    drawLines(defaultInfoSectionLayer, lineOptions);

}


/* Layer destruction section */

Kinetic.Layer.prototype.createDestroyTween = function(){
    var layer = this;
    stopText(layer);
    stopLines(layer);
    this.destroyTween = new Kinetic.Tween({
        node: layer,
        opacity: 0,
        duration: .3,
        onFinish: function(){
            var name = this.node.getName();
            this.node.destroy();
        }
    });
}

function destroyInfoSection(stage){

	var infoLayers = stage.get(".InfoSectionLayer");

    infoLayers.each(function(layer){

        layer.createDestroyTween();
        layer.moveToTop();
        layer.destroyTween.play();

    });

}


function destroyDefaultInfo(stage){

    var defaultInfoLayers = stage.get(".DefaultInfoSectionLayer");

    defaultInfoLayers.each(function(layer){

        layer.createDestroyTween();
        layer.moveToTop();
        layer.destroyTween.play();
    });

}

var unpublishStage = function(stage){

        stage.shrinkSection(stage.currentGrowingSection);
        createDefaultInfo(stage);
        destroyInfoSection(stage);

        console.log("fired stage unpublish");

}

var throttledUnpublish = _.throttle(unpublishStage, 100);

var publishStage = function(event, stage){

    stage.growSection(event.targetNode.getId());
    createInfoSection(event.targetNode.getId(), stage);
    destroyDefaultInfo(stage);
    console.log("fired stage publish");

}

var throttledPublish = _.throttle(publishStage, 100);