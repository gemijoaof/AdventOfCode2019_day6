const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let arrayinput = input.split('\n').map(str => str.replace('\r', ''));

const totalOrbits = array => {
  const listOrbits = array.map(str => str.split(')'));
  const listSpaceObjects = listOrbits.flat();
  let listSpaceObjectsFiltered = [];

  for (const spaceObject of listSpaceObjects) {
    if (!listSpaceObjectsFiltered.includes(spaceObject)) {
      listSpaceObjectsFiltered.push(spaceObject);
    }
  }

  let totalOrbits = 0;
  for (const spaceObject of listSpaceObjectsFiltered) {
    totalOrbits += calcListOrbitsSpaceObject(listOrbits, [spaceObject]).length;
  }

  return totalOrbits;
};

const calcListOrbitsSpaceObject = (listOrbits, listSpaceObjects) => {
  let list = [];

  for (const spaceObject of listSpaceObjects) {
    for (const orbit of listOrbits) {
      if (orbit[0] === spaceObject) {
        list.push(orbit[1]);
      }
    }
  }
  if (!list.length) {
    return [];
  } else {
    return list.concat(calcListOrbitsSpaceObject(listOrbits, list));
  }
};

console.time('time part1');
console.log(totalOrbits(arrayinput));
console.timeEnd('time part1');

const calcOrbitalTransfers = array => {
  let total = 0;
  const listOrbits = array.map(str => str.split(')'));
  const objectYOU = calcSpaceObject(listOrbits, 'YOU');
  const objectSAN = calcSpaceObject(listOrbits, 'SAN');

  let auxSpaceObject = objectYOU;

  while (true) {
    if (isInOrbit(objectSAN, auxSpaceObject, listOrbits)) {
      break;
    } else {
      auxSpaceObject = calcSpaceObject(listOrbits, auxSpaceObject);
      total++;
    }
  }

  const interception = auxSpaceObject;
  auxSpaceObject = objectSAN;

  while (true) {
    if (auxSpaceObject === interception) {
      break;
    } else {
      auxSpaceObject = calcSpaceObject(listOrbits, auxSpaceObject);
      total++;
    }
  }

  return total;
};

const isInOrbit = (objectSAN, spaceObject, listOrbits) => {
  let orbitsOfSpaceObject = calcListOrbitsSpaceObject(listOrbits, [
    spaceObject
  ]);

  if (orbitsOfSpaceObject.includes(objectSAN)) {
    return true;
  } else {
    return false;
  }
};

const calcSpaceObject = (listOrbits, SpaceObjectInOrbit) => {
  for (const orbit of listOrbits) {
    if (orbit[1] === SpaceObjectInOrbit) {
      return orbit[0];
    }
  }
  return '';
};

console.time('time part2');
console.log(calcOrbitalTransfers(arrayinput));
console.timeEnd('time part2');

const test = [
  'COM)B',
  'B)C',
  'C)D',
  'D)E',
  'E)F',
  'B)G',
  'G)H',
  'D)I',
  'E)J',
  'J)K',
  'K)L',
  'K)YOU',
  'I)SAN'
];
