requirejs.config({
    "baseUrl" : "scripts/lib",
    "paths" : {
        "app" : "../app"
    }
});

require(['jquery', 'kinetic', 'underscore'], function(){

    //Set up image loading function
    var stage = new Kinetic.Stage({
        container: 'portfolioCanvas',
        width: 680,
        height: 680
    });

    Kinetic.Stage.prototype.loadImages = function (sources, callback) {
        var images = {};
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
                    callback(images, sources, stage);
                }
            };
            images[source].src = sources[source];
        }
    }

    //Define our colors

    var colorIDs = {
        red: 'red',
        green: 'green',
        blue: 'blue',
        orange: 'orange',
        yellow: 'yellow',
        lightblack: '#636363'
    };


/* Create our background */

//DiamondFactory

//This function returns a Kinetic.Polygon with my default diamond points, and can be overloaded to pass normal KineticJS Polygon config 
//options 

var DiamondFactory = function () {

    //Our default points
    var defaultConfig = {
        points: [150, 90, 260, 50, 420, 50, 530, 90, 630, 210, 340, 650, 50, 210]
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
        fillPatternImage: images.backgroundImage,
        fillPatternOffset: [-50, -50]
    });

    backgroundLayer.add(backgroundDiamond);
    stage.add(backgroundLayer);
}

//createBackground is our stage function to create our background.

Kinetic.Stage.prototype.createBackground = function(images){
    createBackgroundLayer(images, this);
}

/* End Create Background */

/*Create our sections */

//addDiamondTween creates a default to-diamond tween for each section. This tween is played to grow a section and reversed to shrink a section

Kinetic.Polygon.prototype.addDiamondTween = function () {
        this.tween = new Kinetic.Tween({
                node: this,
                name: "DiamondTween",
                opacity: 1,
                duration: 0.7,
                easing: Kinetic.Easings.EaseInOut,
                points: [150, 90, 260, 50, 420, 50, 530, 90, 630, 210, 340, 650, 50, 210]
            }
        )
    };

//createSections creates our five section Polygons and attaches their tween to them, ready to be played using stage.growSection(); It adds
//the Polygons to a new layer, and attaches that layer to the stage. Their ID will need to be changed, but for now colors work. When I
//change the ID logic here, I need to reflect it thoughout the next three methods.

var createSections = function (stage, images) {

        var opacity = .3;
        var filterRadius = 30;

        var sectionsLayer = new Kinetic.Layer({
            id: "SectionsLayer"
        });

        stage.sectionsLayer = sectionsLayer;

        var topSectionImage = new Kinetic.Polygon({
            points: [160, 90, 263, 53, 417, 53, 520, 90, 438, 142, 340, 142, 240, 142],
            fillPatternImage: images.prpImage,
            fillPatternOffset: [-50, -50],
            id: "TopSection",
            opacity: opacity
        });

        topSectionImage.on("click", function(){
            window.open('http://prpco.com','_blank');
        });

        sectionsLayer.add(topSectionImage);

        topSectionImage.addDiamondTween();

        var centerSectionImage = new Kinetic.Polygon({
            points: [214, 229, 244, 151, 437, 151, 464, 229, 492, 307, 338, 307, 184, 307],
            fillPatternImage: images.ccogImage,
            fillPatternOffset: [-50, -50],
            id: "CenterSection",
            opacity: opacity
        });
        sectionsLayer.add(centerSectionImage);

        centerSectionImage.on("click", function(){
            window.open('http://centralcoastolivegrowers.org','_blank');
        });


        centerSectionImage.addDiamondTween();

        var leftSectionImage = new Kinetic.Polygon({
            points: [103, 151, 151, 94, 193, 122, 235, 150, 204, 227, 174, 303, 56, 208],
            fillPatternImage: images.aethysImage,
            fillPatternOffset: [-50, -50],
            id: "LeftSection",
            opacity: opacity
        });
        sectionsLayer.add(leftSectionImage);

        leftSectionImage.on("click", function(){
            window.open('http://aethys.lookingforgroup.net/drupal','_blank');
        });


        leftSectionImage.addDiamondTween();

        var rightSectionImage = new Kinetic.Polygon({
            points: [446, 148, 487, 121, 529, 94, 577, 151, 625, 208, 502, 304, 474, 226],
            fillPatternImage: images.jbdewarImage,
            fillPatternOffset: [-50, -50],
            id: "RightSection",
            opacity: opacity
        });
        sectionsLayer.add(rightSectionImage);

        rightSectionImage.on("click", function(){
            window.open('http://jbdewar.com','_blank');
        });


        rightSectionImage.addDiamondTween();

        var bottomSectionImage = new Kinetic.Polygon({
            points: [195, 318, 230, 318, 350, 318, 450, 318, 491, 318, 340, 643, 184, 318],
            fillPatternImage: images.ccgImage,
            fillPatternOffset: [-50, -50],
            id: "BottomSection",
            opacity: opacity
        });
        sectionsLayer.add(bottomSectionImage);

        bottomSectionImage.on("click", function(){
            window.open('http://centralcoastgrown.org','_blank');
        });


        bottomSectionImage.addDiamondTween();

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


/*Begin our InfoSection Creation methods*/

/*Begin our line drawing methods */

//Creates an array of starting points

function createStartingPoints(lineOptions){
    var returnArray = [];
    returnArray.push(lineOptions.firstPoint.x, lineOptions.firstPoint.y, lineOptions.firstPoint.x, lineOptions.firstPoint.y, lineOptions.firstPoint.x, lineOptions.firstPoint.y);
    return returnArray;
}

//Creates the points of the first tween

function createFirstTweenPoints(lineOptions){
    var returnArray = [];
    returnArray.push(lineOptions.firstPoint.x, lineOptions.firstPoint.y, lineOptions.secondPoint.x, lineOptions.secondPoint.y, lineOptions.secondPoint.x, lineOptions.secondPoint.y);
    return returnArray;
}

//Creats the points of the second tween

function createSecondTweenPoints(lineOptions){
    var returnArray = [];
    returnArray.push(lineOptions.firstPoint.x, lineOptions.firstPoint.y, lineOptions.secondPoint.x, lineOptions.secondPoint.y, lineOptions.thirdPoint.x, lineOptions.thirdPoint.y);
    return returnArray;
}

//Creates our line drawing animation tween

function createDrawLineTween(lineToTween, lineOptions){

    var firstPoints = createFirstTweenPoints(lineOptions);
    var secondPoints = createSecondTweenPoints(lineOptions);

    lineToTween.tween = new Kinetic.Tween({
        node: lineToTween,
        duration: 0.5,
        easing: Kinetic.Easings.EaseInOut,
        points: firstPoints,
        onFinish: function () {
            this.node.drawSegment2 = new Kinetic.Tween({
                node: lineToTween,
                duration: 0.5,
                easing: Kinetic.Easings.EaseInOut,
                points: secondPoints
            });
            this.node.drawSegment2.play();
        }
    });
}

//Creates a single line object from options. All three points are on the starting point, ready for animating.

function createLineObject(lineOptions){

    var startingPointArray = createStartingPoints(lineOptions);

    var lineObject = new Kinetic.Line({
        points: startingPointArray,
        stroke: lineOptions.strokeColor,
        strokeWidth: lineOptions.strokeWidth,
        lineCap: lineOptions.lineCap,
        lineJoin: lineOptions.lineJoin,
        name: "InfoLine"
    });

    return lineObject;

}

//Creates our line objects from a config object

function createLines(layer, lines){

    _.each(lines, function(element){

        var finishedLine = createLineObject(element);
        layer.add(finishedLine);
        createDrawLineTween(finishedLine, element);
    
    });

}

//Creates and plays our lines

function drawLines (layer, options) {

        var lines = options.lines;

        createLines(layer, lines);

        playLines(layer);

}

//Finishes our drawing so a line is "finished" on destroy

function destroyLine(line){
    
    line.tween.finish();
    line.drawSegment2.finish();

}

//Plays all of our created lines on a layer

function playLines(layer){
    _.each(layer.get(".InfoLine").toArray(), function(element){
        element.tween.play();
    });
}

//Stops all of our created lines on a layer

function stopLines(layer){
    _.each(layer.get(".InfoLine").toArray(), function(element){
        destroyLine(element);
    });
}


/* Begin text drawing section */

//Creates our text object. Each text object has three components : the primary text, a title, and a wipe square that fades the text in.

function createTextObject(textOptions){

    var textNode = new Kinetic.Text({
            x : textOptions.x,
            y : textOptions.titleFontSize + 10 + textOptions.y,
            text : textOptions.text,
            fontSize : textOptions.fontSize,
            fontFamily : 'Ubuntu',
            width : textOptions.width,
            align : textOptions.align,
            fill : 'black',
            name: 'InfoText'
    });

    if (textOptions.title.length <= 20){
        var adjustedY = textOptions.y;
    } else {
        var adjustedY = textOptions.y - (textOptions.titleFontSize);
    }

    textNode.titleNode = new Kinetic.Text({
            x: textOptions.x,
            y: adjustedY,
            text: textOptions.title,
            fontSize : textOptions.titleFontSize,
            fontFamily : 'Ubuntu',
            fontStyle : 'bold',
            width : textOptions.width,
            align: textOptions.align,
            fill: 'black',
            name: 'InfoTitle'
    });

    textNode.wipeNode = new Kinetic.Rect({
            x : textOptions.x,
            y : adjustedY,
            width: textOptions.width,
            height : textNode.getHeight() + textNode.titleNode.getHeight() + 12,
            fill : 'white'
    });

    return textNode;
}


function createWipeTween(textNode, textOptions){
    textNode.wipeNode.wipe = new Kinetic.Tween({
            node: textNode.wipeNode,
            x : textOptions.x + textOptions.width,
            width : 0,
            duration : .9,
            easing : Kinetic.Easings.EaseInOut
    });
}

//Creates our text objects and adds them to our layer
function createTexts(layer, texts){

    _.each(texts, function(element){

        var finishedText = createTextObject(element);
        layer.add(finishedText);
        layer.add(finishedText.titleNode);
        layer.add(finishedText.wipeNode);
        createWipeTween(finishedText, element);
    
    });

}
//Creates and plays all text on a layer
function drawText(layer, options ){

    var texts = options.text;

        createTexts(layer, texts);

        playText(layer);
}



//Finishes text animation

function destroyText(text){

    text.wipeNode.wipe.finish();

}

//Plays all text on a layer

function playText(layer){
    _.each(layer.get(".InfoText").toArray(), function(element){
        element.wipeNode.wipe.play();
    });
}

//Stops text from playing on a layer, so it can be faded

function stopText(layer){
    _.each(layer.get(".InfoText").toArray(), function(element){
        destroyText(element);
    });
}

/* End draw text section */

/* Begin options section */

//Passes back the correct text options to createInfoSection

function getTextOptions(targetSection){
    switch(targetSection){
       
        case "TopSection":
            return {
                        text: {
                            text1: {
                                x : 0,
                                y : 20,
                                width: 135,
                                fontSize : 12,
                                text: 'My first non-WordPress site.\nMakes use of Joomla\'s MVC structure.\nIncludes custom modules',
                                title: 'Built on Joomla 2.5    ',
                                titleFontSize : 15
                            },
                            text2: {
                                x : 40,
                                y : 460,
                                width: 140,
                                fontSize: 12,
                                text: 'Active blog\nE-commerce module\nMonthly promotions\nHand-rolled company directory with QR Code to vCard module',
                                title: 'Features',
                                titleFontSize : 15

                            },
                            text3: {
                                x : 550,
                                y : 370,
                                width: 130,
                                fontSize: 12,
                                text: 'Uses several\nstrategies for\ngathering client\ninformation, including\nmodal dialogues,\nmobile-friendly\nregistration, and\nMailChimp integration',
                                title: 'Information\ncollection',
                                titleFontSize : 15,
                                align: 'right'

                            },
                            text4: {
                                x : 560,
                                y : 20,
                                width: 120,
                                fontSize: 12,
                                text: 'Search Engine\nOptimized for\ntarget keywords.\nStrategically\norganized content\nTargetted\nresponsive design.',
                                title: 'Comprehensive\nmarketing tool',
                                titleFontSize : 15,
                                align: 'right'

                            }
                        }
                    };
            break;

        case "RightSection":
            return {
                    text: {
                        text1: {
                                x : 0,
                                y : 360,
                                width: 130,
                                fontSize : 12,
                                text: 'I worked with designers, marketing associates, and clients to produce a site the whole team can be proud of',
                                title: 'Collaborative effort    ',
                                titleFontSize : 15
                            },
                        text2: {
                                x : 540,
                                y : 20,
                                width: 140,
                                fontSize: 12,
                                text: 'Brings a fresh look to a\nlocal institution.\nSite theme designed by\nmyself and Morgan\nDewar',
                                title: '    Handcrafted\ndesign',
                                titleFontSize : 15,
                                align: 'right'
                        },
                        text3: {
                                x : 560,
                                y : 380,
                                width: 120,
                                fontSize: 12,
                                text: 'Full responsive\ndesign with a cool\nmenu, dynamic\nhomepage content\n and an attractive,\nmobile-friendly,\ninteractive interface',
                                title: 'Features',
                                titleFontSize : 15,
                                align : 'right'

                            }
                        }
                    };
            break;

        case "CenterSection":
            return {
                        text: {
                            text1: {
                                x : 15,
                                y : 20,
                                width: 145,
                                fontSize : 12,
                                text: 'Moved a previously static site to a WordPress install with all the bells and whistles',
                                title : 'WordPress migration   ',
                                titleFontSize : 15
                            },
                            text2: {
                                x : 40,
                                y : 480,
                                width: 140,
                                fontSize: 12,
                                text: 'Sizzling WordPress user managment and content management paired with the world\'s most popular oil',
                                title: 'A tasty combination   ',
                                titleFontSize : 15

                            },
                            text3: {
                                x : 550,
                                y : 470,
                                width: 130,
                                fontSize: 12,
                                text: 'Subscription based\nmembership, hand-\nrolled member profile\npage, active forum,\nand client training!',
                                title: 'Features',
                                titleFontSize : 15,
                                align: 'right'

                            }
                        }
                    };
            break;
        
        case "LeftSection":
            return {
                    text: {
                        text1: {
                            x : 0,
                            y : 480,
                            width: 140,
                            fontSize : 12,
                            text: 'Built in the award winning developer\'s CMS\n\nMakes use of their integrated forum\n\nContent separated into books for intuitive navigation',
                            title : 'Drupal CMS',
                            titleFontSize : 15
                        },
                        text2: {
                            x : 520,
                            y : 460,
                            width: 140,
                            fontSize: 12,
                            text: 'All assets created by\nyours truly. How would\nyour business look with\na mystical theme?',
                            title: 'A chance to flex\nmy design muscles',
                            titleFontSize : 15,
                            align: 'right'
                        },
                        text3: {
                            x : 550,
                            y : 0,
                            width: 130,
                            fontSize: 12,
                            text: 'This site was a great\nway to create\nsomething combining\ntwo of my passions -\ngaming and web\ndevelopment',
                            title: 'I\'m a gamer!',
                            titleFontSize : 15,
                            align: 'right'
                        }
                    }
                
                };
            break;

        case "BottomSection":
            return {
                    text: {
                        text1: {
                            x : 0,
                            y : 20,
                            width: 130,
                            fontSize : 12,
                            text: 'Customer user map and profiles, dynamic content display, and a gorgeous blog',
                            title: 'Features',
                            titleFontSize : 15
                        },
                        text2: {
                            x : 530,
                            y : 490,
                            width: 130,
                            fontSize: 12,
                            text: 'My first production site. The design was a collaboration between myself and legend Charmaine Martinez',
                            title : '    Where it all\nbegan',
                            titleFontSize : 15,
                            align : 'right'
                        }
                    }
                };
            break;
        default:
            console.log("Don't know that section target");
            break;

    }

}

function getLineOptions (targetSection){

    switch(targetSection){
       
        case "TopSection":
            return {
                    lines: {
                        line1: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 150,
                                y: 110
                            },
                            secondPoint: {
                                x: 135,
                                y: 40
                            },
                            thirdPoint: {
                                x: 0,
                                y: 40
                            }
                        },
                        line2: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 300,
                                y: 550
                            },
                            secondPoint: {
                                x: 180,
                                y: 480
                            },
                            thirdPoint: {
                                x: 40,
                                y: 480
                            }
                        },
                        line3: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 460,
                                y: 430
                            },
                            secondPoint: {
                                x: 540,
                                y: 390
                            },
                            thirdPoint: {
                                x: 680,
                                y: 390
                            }
                        },
                        line4: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 470,
                                y: 80
                            },
                            secondPoint: {
                                x: 550,
                                y: 40
                            },
                            thirdPoint: {
                                x: 680,
                                y: 40
                            }
                        }

                    }
                };
            break;

        case "RightSection":
            return {
                    lines: {
                        line1: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 230,
                                y: 450
                            },
                            secondPoint: {
                                x: 130,
                                y: 380
                            },
                            thirdPoint: {
                                x: 0,
                                y: 380
                            }
                        },
                        line2: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 460,
                                y: 90
                            },
                            secondPoint: {
                                x: 530,
                                y: 40
                            },
                            thirdPoint: {
                                x: 680,
                                y: 40
                            }
                        },
                        line3: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 460,
                                y: 440
                            },
                            secondPoint: {
                                x: 550,
                                y: 400
                            },
                            thirdPoint: {
                                x: 680,
                                y: 400
                            }
                        }

                    }
                };
            break;

        case "CenterSection":
            return {
                    
                    lines: {
                        line1: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 260,
                                y: 80
                            },
                            secondPoint: {
                                x: 160,
                                y: 40
                            },
                            thirdPoint: {
                                x: 15,
                                y: 40
                            }
                        },
                        line2: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 280,
                                y: 400
                            },
                            secondPoint: {
                                x: 180,
                                y: 500
                            },
                            thirdPoint: {
                                x: 40,
                                y: 500
                            }
                        },
                        line3: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 465,
                                y: 420
                            },
                            secondPoint: {
                                x: 540,
                                y: 490
                            },
                            thirdPoint: {
                                x: 680,
                                y: 490
                            }
                        }
                    }

                };
            break;
        
        case "LeftSection":
            return {
                   lines: {
                        line1: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 223,
                                y: 400
                            },
                            secondPoint: {
                                x: 130,
                                y: 500
                            },
                            thirdPoint: {
                                x: 0,
                                y: 500
                            }
                        },
                        line2: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 460,
                                y: 415
                            },
                            secondPoint: {
                                x: 520,
                                y: 480
                            },
                            thirdPoint: {
                                x: 660,
                                y: 480
                            }
                        },
                        line3: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 530,
                                y: 90
                            },
                            secondPoint: {
                                x: 560,
                                y: 20
                            },
                            thirdPoint: {
                                x: 680,
                                y: 20
                            }
                        }
                    }
                };
            break;

        case "BottomSection":
            return {
                    lines: {
                        line1: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 170,
                                y: 150
                            },
                            secondPoint: {
                                x: 140,
                                y: 40
                            },
                            thirdPoint: {
                                x: 0,
                                y: 40
                            }
                        },
                        line2: {
                            strokeColor: colorIDs.lightblack,
                            strokeWidth: 1,
                            lineCap: 'square',
                            lineJoin: 'round',
                            firstPoint: {
                                x: 400,
                                y: 460
                            },
                            secondPoint: {
                                x: 520,
                                y: 510
                            },
                            thirdPoint: {
                                x: 660,
                                y: 510
                            }
                        }
                    }
                };
            break;
        default:
            console.log("Don't know that section target");
            break;

    }

}

//Returns default text options

function getDefaultTextOptions(){
    return {
           text: {
                rightText: {
                    x : 560,
                    y : 350,
                    width: 120,
                    fontSize : 12,
                    text: 'Rebuild of local oil corporation\'s web presence, including responsive design and MailChimp newsletter integration',
                    title : 'JB Dewar',
                    titleFontSize : 15,
                    align: 'right'
                },
                bottomText: {
                    x : 520,
                    y : 530,
                    width: 150,
                    fontSize: 12,
                    text: 'Complete overhault of a\nmulti-functioned farmer\nadvocacy nonprofit. My\nfirst production site!',
                    title: 'Central Coast Grown',
                    titleFontSize : 15,
                    align: 'right'
                },
                centerText: {
                    x : 0,
                    y : 440,
                    width: 132,
                    fontSize: 12,
                    text: 'WordPress re-imagining of a previously static site. Hand-rolled members list.',
                    title: 'Central Coast Olive Growers',
                    titleFontSize : 15
                },
                leftText: {
                    x : 0,
                    y : 10,
                    width: 130,
                    fontSize: 12,
                    text: 'Feel-based fantasy roleplaying website template. Never got off the ground, but still fun to look at.',
                    title: 'World of Aethys',
                    titleFontSize : 15
                },
                topText: {
                    x : 525,
                    y : 0,
                    width: 125,
                    fontSize: 12,
                    text: 'Multi-service print\nand marketing\nagency. Blog, responsive menu,\nsome neat server-\nside doodads.',
                    title: 'PRP Companies',
                    titleFontSize : 15,
                    align: 'right'
                }
            }
        };
}

//Returns default line options

function getDefaultLineOptions(){

    return {
        lines: {
            rightLine: {
                strokeColor: colorIDs.lightblack,
                strokeWidth: 1,
                lineCap: 'square',
                lineJoin: 'round',
                firstPoint: {
                    x: 525,
                    y: 270
                },
                secondPoint: {
                    x: 550,
                    y: 370
                },
                thirdPoint: {
                    x: 680,
                    y: 370
                }
            },
            bottomLine: {
                strokeColor: colorIDs.lightblack,
                strokeWidth: 1,
                lineCap: 'square',
                lineJoin: 'round',
                firstPoint: {
                    x: 385,
                    y: 500
                },
                secondPoint: {
                    x: 510,
                    y: 550
                },
                thirdPoint: {
                    x: 670,
                    y: 550
                }
            },
            centerLine: {
                strokeColor: colorIDs.lightblack,
                strokeWidth: 1,
                lineCap: 'square',
                lineJoin: 'round',
                firstPoint: {
                    x: 210,
                    y: 300
                },
                secondPoint: {
                    x: 142,
                    y: 460
                },
                thirdPoint: {
                    x: 0,
                    y: 460
                }
            },
            leftLine: {
                strokeColor: colorIDs.lightblack,
                strokeWidth: 1,
                lineCap: 'square',
                lineJoin: 'round',
                firstPoint: {
                    x: 150,
                    y: 125
                },
                secondPoint: {
                    x: 140,
                    y: 30
                },
                thirdPoint: {
                    x: 0,
                    y: 30
                }
            },
            topLine: {
                strokeColor: colorIDs.lightblack,
                strokeWidth: 1,
                lineCap: 'square',
                lineJoin: 'round',
                firstPoint: {
                    x: 370,
                    y: 70
                },
                secondPoint: {
                    x: 480,
                    y: 20
                },
                thirdPoint: {
                    x: 650,
                    y: 20
                }
            }
        }
    };

}


/* End options section */


/* Layer creation section */


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
}

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

var imageSources = {
    ccogImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/ccog-full.jpg',
    aethysImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/aethys-full.jpg',
    prpImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/prp-full.jpg',
    ccgImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/ccg-full.jpg',
    jbdewarImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/jbdewar-full.jpg',
    backgroundImage: 'http://thisblogisdiamonds.com/wordpress/wp-content/themes/twentytwelve-child/images/background-diamond.png'
}

stage.loadImages(imageSources, createLayers);

});