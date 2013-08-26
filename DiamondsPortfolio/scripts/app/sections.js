/*Create our sections */

//addDiamondTween creates a default to-diamond tween for each section. This tween is played to grow a section and reversed to shrink a section

Kinetic.Polygon.prototype.addDiamondTween = function () {
    this.tween = new Kinetic.Tween({
            node: this,
            name: "DiamondTween",
            opacity: 1,
            duration: 0.7,
            easing: Kinetic.Easings.EaseInOut,
            points: mainOptions.diamondPoints
    });
}

//createSections creates our five section Polygons and attaches their tween to them, ready to be played using stage.growSection(); It adds
//the Polygons to a new layer, and attaches that layer to the stage. Their ID will need to be changed, but for now colors work. When I
//change the ID logic here, I need to reflect it thoughout the next three methods.

var createSections = function (stage, images) {

    var opacity = .3;
    
    var sectionsLayer = new Kinetic.Layer({
        id: "SectionsLayer"
    });

    stage.sectionsLayer = sectionsLayer;

    _.each(sectionOptions.sections, function(section){
        var sectionPolygon = new Kinetic.Polygon({
            points : section.points,
            fillPatternImage : section.image,
            fillPatternOffset : mainOptions.fillPatternOffset,
            id : section.id,
            opacity : sectionOptions.sectionOpacity 
        });

        sectionPolygon.on("click", function(){
            window.open(section.targetURL, "_blank");
        });

        sectionsLayer.add(sectionPolygon);

        sectionPolygon.addDiamondTween();
    });

    stage.add(sectionsLayer);
}

//Our stage function to create our sections layer

Kinetic.Stage.prototype.createSectionsLayer = function(images){
    createSections(this, images);
}


//sectionsLayerBind binds our input events to our input layer


//growSection animates a section to fill the background diamond by looking up the section by ID and playing its tween.

Kinetic.Stage.prototype.growSection = function(targetSection){

    this.currentGrowingSection = targetSection;
    var section = this.get("#"+targetSection).toArray()[0];
    section.moveToTop(); 
    section.tween.play();

}

//shrinkSection animates a section to return it to its original size.

Kinetic.Stage.prototype.shrinkSection = function(targetSection){

    this.get("#"+targetSection).toArray()[0].tween.reverse();

}
