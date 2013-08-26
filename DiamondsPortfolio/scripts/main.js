//Main script

requirejs.config({
    "baseUrl" : "scripts/lib",
    "paths" : {
        "app" : "../app"
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery', 'kinetic', 'underscore'], function(){
	require(['app/background', 'app/layers', 'app/lines', 'app/options', 'app/sections', 'app/text'], function(){
		var stage = new Kinetic.Stage({
	        container: 'portfolioCanvas',
	        width: 680,
	        height: 680
	    });

		Kinetic.Stage.prototype.loadImages = function (sources, callback) {
	        var loadedImages = 0;
	        var numImages = 0;
	        // get num of sources
	        var src = 0;
	        for (src in sources) {
	            numImages++;
	        }

	        var stage = this;

	        for (var source in sources) {
	            images[source] = new Image({
	            });
	            images[source].onload = function () {
	                if (++loadedImages >= numImages) {
	                	setImages();
	                    callback(images, sources, stage);
	                }
	            };
	            images[source].src = sources[source];
	        }
	    }

	    function setImages(){
	    	sectionOptions.sections.topSection.image = images.prpImage;
	    	sectionOptions.sections.centerSection.image = images.ccogImage;
	    	sectionOptions.sections.rightSection.image = images.jbdewarImage;
	    	sectionOptions.sections.leftSection.image = images.aethysImage;
	    	sectionOptions.sections.bottomSection.image = images.ccgImage;
	    		
	    }

		stage.loadImages(imageSources, createLayers);
	});
});