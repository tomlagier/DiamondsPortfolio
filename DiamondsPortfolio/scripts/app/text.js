function createTextObject(textOptions){

    var textNode = new Kinetic.Text({
            x : textOptions.x,
            y : textsOptions.titleFontSize + textsOptions.titleSpacer + textOptions.y,
            text : textOptions.text,
            fontSize : textsOptions.fontSize,
            fontFamily : textsOptions.fontFamily,
            width : textOptions.width,
            align : textOptions.align,
            fill : textsOptions.fontColor,
            name: 'InfoText'
    });

    if (textOptions.title.length <= 20){
        var adjustedY = textOptions.y;
    } else {
        var adjustedY = textOptions.y - (textsOptions.titleFontSize);
    }

    textNode.titleNode = new Kinetic.Text({
            x: textOptions.x,
            y: adjustedY,
            text: textOptions.title,
            fontSize : textsOptions.titleFontSize,
            fontFamily : textsOptions.titleFontFamily,
            fontStyle : textsOptions.titleFontStyle,
            width : textOptions.width,
            align: textOptions.align,
            fill: textsOptions.titleFontColor,
            name: 'InfoTitle'
    });

    textNode.wipeNode = new Kinetic.Rect({
            x : textOptions.x,
            y : adjustedY,
            width: textOptions.width,
            height : textNode.getHeight() + textNode.titleNode.getHeight() + textsOptions.titleSpacer + 2,
            fill : 'white'
    });

    return textNode;
}


function createWipeTween(textNode, textOptions){
    textNode.wipeNode.wipe = new Kinetic.Tween({
            node: textNode.wipeNode,
            x : textOptions.x + textOptions.width,
            width : 0,
            duration : textsOptions.wipeDuration,
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
function drawText(layer, textOptions){

    //var texts = textOptions.textObjects;
    
        createTexts(layer, textOptions);

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

function getTextOptions(targetSection){
    switch(targetSection){
       
        case "TopSection":
            return textsOptions.textObjects.topSectionText;
            break;

        case "RightSection":
            return textsOptions.textObjects.rightSectionText;
            break;

        case "CenterSection":
            return textsOptions.textObjects.centerSectionText; 
            break;
        
        case "LeftSection":
            return textsOptions.textObjects.leftSectionText;
            break;

        case "BottomSection":
            return textsOptions.textObjects.bottomSectionText;
            break;
        default:
            console.log("Don't know that section target");
            break;

    }

}

function getDefaultTextOptions(){
    return textsOptions.textObjects.defaultText;
}
/* End draw text section */