/*Begin our line drawing methods */

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
        duration: linesOptions.drawSegmentDuration,
        easing: Kinetic.Easings.EaseInOut,
        points: firstPoints,
        onFinish: function () {
            this.node.drawSegment2 = new Kinetic.Tween({
                node: lineToTween,
                duration: linesOptions.drawSegmentDuration,
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
        stroke: linesOptions.strokeColor,
        strokeWidth: linesOptions.strokeWidth,
        lineCap: linesOptions.lineCap,
        lineJoin: linesOptions.lineJoin,
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

        createLines(layer, options);

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

function getLineOptions (targetSection){

    switch(targetSection){
        case "TopSection" :
            return linesOptions.linesObjects.topSectionLines;
            break;
        case "CenterSection" :
            return linesOptions.linesObjects.centerSectionLines;
            break;
        case "RightSection" :
            return linesOptions.linesObjects.rightSectionLines;
            break;
        case "LeftSection" :
            return linesOptions.linesObjects.leftSectionLines;
            break;
        case "BottomSection" :
            return linesOptions.linesObjects.bottomSectionLines;
            break;
        default:
            console.error("No line section by that name");
            break;
    }
}

function getDefaultLineOptions(){
    return linesOptions.linesObjects.defaultLines;
}
