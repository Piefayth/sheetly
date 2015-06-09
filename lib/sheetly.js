var Sheetly = function(input, opts){
    this.sheetly = {};
    this.sheetstring = parseObjectToStylesheet(input, this.sheetly);
}

// Adds a style to the sheetly object and appends it to the current sheetstring
// An update to an existing style will remove the original and append the update

Sheetly.prototype.add = function(selector, styles){

  if(!this.sheetly[selector]){
    this.sheetly[selector] = {};
    this.sheetly[selector].stringified = '';
  }

  var sheetlySelected = this.sheetly[selector];
  var sheetlyStyles = this.sheetly[selector].styles || {};
  var oldIndex = sheetlySelected.sheetIndex;

  //Iterate through styles parameter and assign each complete style to the
  //relevant property in the styles object for this selector.
  for(var property in styles){
    var oneStyle = {
      name: property,
      value: styles[property]
    }

    sheetlyStyles[property] = oneStyle;
  }

  //Split the sheetstring into two halves. Left is everything up until the
  //stored index for the given selector. Right is everything after index
  //plus the length of the stringified styles for the given selector.
  var offset = sheetlySelected.stringified.length
  var left = this.sheetstring.substr(0, sheetlySelected.sheetIndex)
  var right = this.sheetstring.substr(sheetlySelected.sheetIndex + sheetlySelected.stringified.length);

  //We will be appending the result, so just join the sheetstring for now.
  //Consider the possibility that this would be expensive for a large
  //stylesheet. We're basically doing a string splice.

  this.sheetstring = left + right;
  sheetlySelected.sheetIndex = this.sheetstring.length;

  //This changes all the indexes. Update them if they came after the removed
  //style. Afterward, append the stringified style to the stylesheet.
  for(var iteratedSelector in this.sheetly){
    if(iteratedSelector != selector)
      this.sheetly[iteratedSelector].sheetIndex -= sheetlySelected.stringified.length;
  }

  sheetlySelected.stringified = stylesToString(sheetlyStyles, selector);
  this.sheetstring += sheetlySelected.stringified;


}

Sheetly.prototype.remove = function(selector, property){
  var sheetlySelected = this.sheetly[selector];
  var sheetlyStyles = this.sheetly[selector].styles;
  var oldIndex = sheetlySelected.sheetIndex;

  //This removal is the same as the first step of the add method.
  var left = this.sheetstring.substr(0, sheetlySelected.sheetIndex);
  var right = this.sheetstring.substr(sheetlySelected.sheetIndex + sheetlySelected.stringified.length);

  this.sheetstring = left + right;
  sheetlySelected.sheetIndex = this.sheetstring.length;

  for(var iteratedSelector in this.sheetly){
    if(iteratedSelector != selector)
      this.sheetly[iteratedSelector].sheetIndex -= sheetlySelected.stringified.length;
  }

  //Update the object.

  if(!property){
    delete this.sheetly[selector];
    return;
  } else {
    delete sheetlySelected.styles[property];
    console.log(sheetlySelected.styles);
    sheetlySelected.stringified = stylesToString(sheetlyStyles, selector);
    this.sheetstring += sheetlySelected.stringified;
  }


}

// This function is passed the sheetly object
// and returns a stylesheet as a string. Note that
// this method modifies the this.sheetly directly.

function parseObjectToStylesheet(input, sheetly){

  var resultstring = '';

  for(var selector in input){

    sheetly[selector] = sheetly[selector] || {};
    sheetly[selector].styles = sheetly[selector].styles || {};

    for(var property in input[selector]){

      var oneStyle = {
        name: property,
        value: input[selector][property]
      }

      sheetly[selector].styles[property] = oneStyle;

    }
    sheetly[selector].stringified = stylesToString(sheetly[selector].styles, selector)
    sheetly[selector].sheetIndex = resultstring.length;
    resultstring += sheetly[selector].stringified;
  }

  return resultstring;
}

function stylesToString(styles, selector){
  var stringified = selector + '{';

  for(var style in styles){
    stringified += styles[style].name + ': ' + styles[style].value + ';';
  }

  stringified += '}';

  return stringified;
}


module.exports = Sheetly;
