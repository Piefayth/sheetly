var Sheetly = function(input, opts){
    this.sheetly = {};

    /*

    {

      'body': {
        styles: {
          'background-color': {
            property: 'background-color',
            value: 'black',
          },
          'color': {
            property: 'color',
            value: 'white',
          }},
      sheetIndex = 0,
      stringified = 'body{background-color: black;color: white;}'
      }
      'div a': {
        styles: [
        {
          property: 'background-color',
          value: 'red'
        },
        {
          property: 'color',
          value: 'green'
        }],
        sheetIndex = 43,
        stringified = 'div a{background-color: red;color: green;}'
      }
    }


    */

    this.sheetstring = parseObjectToStylesheet(input, this.sheetly);
}

Sheetly.prototype.add = function(selector, styles){
  var sheetlySelected = this.sheetly[selector];
  var sheetlyStyles = this.sheetly[selector].styles;

  for(var property in styles){
    var oneStyle = {
      name: property,
      value: styles[property]
    }

    sheetlyStyles[property] = oneStyle;
  }

  var left = this.sheetstring.substr(0, sheetlySelected.sheetIndex)
  var right = this.sheetstring.substr(sheetlySelected.sheetIndex + sheetlySelected.stringified.length);

  this.sheetstring = left + right;
  sheetlySelected.sheetIndex = this.sheetstring.length;

  for(var iteratedSelector in this.sheetly){
    if(iteratedSelector != selector)
      this.sheetly[iteratedSelector].sheetIndex -= sheetlySelected.stringified.length;
  }

  sheetlySelected.stringified = stylesToString(sheetlyStyles, selector);

  this.sheetstring += sheetlySelected.stringified;


}

Sheetly.prototype.remove = function(selector, property){
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
