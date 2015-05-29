var Sheetly = function(input, opts){
    this.sheetly = {};

    /*

    {

      'body': {
        styles: [
          {
            property: 'background-color',
            value: 'black',
          },
          {
            property: 'color',
            value: 'white',
          }],
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
    console.log(this.sheetly);
    console.log(this.sheetstring);
}

Sheetly.prototype.add = function(obj){
}

Sheetly.prototype.remove = function(obj){
}

Sheetly.prototype.update = function(obj){
}

// This function is passed the sheetly object as obj
// and returns a stylesheet as a string. Note that
// this method modifies this.obj (the sheetly object) directly.

function parseObjectToStylesheet(input, sheetly){

  var resultstring = '';

  for(var selector in input){
    for(var property in input[selector]){

      sheetly[selector] = sheetly[selector] || {};
      sheetly[selector].styles = sheetly[selector].styles || [];

      var oneStyle = {
        property: property,
        value: input[selector][property]
      }

      if(sheetly[selector].styles){
        sheetly[selector].styles.push(oneStyle);
      }
      else {
        sheetly[selector].styles = [oneStyle];
      }
    }
    sheetly[selector].stringified = stylesToString(sheetly[selector].styles, selector)
    sheetly[selector].sheetIndex = resultstring.length;
    resultstring += sheetly[selector].stringified;
  }

  return resultstring;
}

function stylesToString(styles, selector){

  var stringified = selector + '{';


  styles.forEach(function(style){
    stringified += style.property + ': ' + style.value + ';';
  })

  stringified += '}';

  return stringified;

}


module.exports = Sheetly;
