//const _ = require('lodash');

// Helper functions
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function createArrayOfArrays(size, el) {
  const arr = [];
  for (let i = 0; i < size; i++) { arr.push( clone(el) ); }
  return arr;
}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    } else {
      console.log(message + ' - OK');
    }
}


function encodeRailFenceCipher(string, numberRails) {
  const encodedRails = createArrayOfArrays(numberRails, []);
  let i = 0;
  let reverse = false;

  string.split('').forEach( ch => {
    if (i === numberRails) {
      reverse = true;
      i -= 2;
    } else if (i === -1) {
      reverse = false;
      i += 2;
    }

    encodedRails[i].push(ch);

    if (reverse) i--;
    else i++;

  } );

  return [].concat(...encodedRails).join('');

}

function decodeRailFenceCipher(string, numberRails) {
  const len = string.length;
  const perLine = Math.floor( len / numberRails );
  const firstLine = perLine - 1;
  const lastLine = perLine - 2;
  const indices = createArrayOfArrays(numberRails, [0, null]);
  const middleLines = numberRails - 2;
  const middleLineLen = Math.floor((len - firstLine - lastLine) / middleLines);
  const result = [];

  let start = firstLine;
  let reverse = false;
  let i = 0;

  indices[0] = [0, firstLine];
  indices[numberRails - 1] = [len - lastLine, len];

  for (let lineNum = 1; lineNum <= middleLines; lineNum++) {
    indices[lineNum] = [start, start + middleLineLen];
    start += middleLineLen;
  }

  while (result.length < len) {
    if (i === numberRails) {
      reverse = true;
      i -= 2;
    } else if (i === -1) {
      reverse = false;
      i += 2;
    }

    if (indices[i][0] !== indices[i][1]) {
      result.push(string[indices[i][0]]);
      indices[i][0] += 1;
    }

    if (reverse) i--;
    else i++;

  }

  return result.join('');

}

function test() {
  let result, msg;

  result = encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3);
  msg = `Expected ${result} to equal WECRLTEERDSOEEFEAOCAIVDEN`;
  assert(result === "WECRLTEERDSOEEFEAOCAIVDEN", msg);

  result = decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3);
  msg = `Expected ${result} to equal WEAREDISCOVEREDFLEEATONCE`;
  assert(result === "WEAREDISCOVEREDFLEEATONCE", msg);

  result = encodeRailFenceCipher("Hello, World!", 3);
  msg = `Expected ${result} to equal Hoo!el,Wrdl l`;
  assert(result === "Hoo!el,Wrdl l", msg);

  string = `mo nitmaairp erit x ames!t ics ipidieimoao tv urtciiusstibsxeiinurtstreruinreaact
  eep end, e  g eeteuoitienaesias!miDidu  unttqcrenomsseicrqe.asdf a e e iera uP afo!aro iu,m l
  vdrt aepAupoenviVmu mril s eiuleotkej    eiouiniros pastt  n  af f`;
  result = encodeRailFenceCipher(string, 44);

  string = `encode dav  iturste  oouim s,   epioose  auspAteiifettrir!idtri ird e px aosmr
  fartsa eti  sen  voei iuc uvraitisuqd u miqsp ct mtee aumetu urlpP!etVmsr ia ei tiosimiu
  nsirelpakixge m.fn otaectia no!rnaief,bmoc jsercnueia onteire  in uaeelDienee sadan 44
  decode dngae xevs i   vkm  oa.iiepfttilnue e r irosauittscsaet ne ru c avutofriio amanurii
  aimtsndmsiooa osi!ssautr , q ne xdiae p ein  u eeee afip mi,Didi blorqrmeoissoes pmcaei
  V u rctj  ttesnad !eiuimPr s!tpc prelneAierurtr ueieta ieituuatiemt nfeo`;
  result = encodeRailFenceCipher(string, 44);

}


test();
