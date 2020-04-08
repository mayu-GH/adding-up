'use strict';
const fs = require('fs');
const rfs = fs.readFileSync('./popu-pref.csv', 'utf-8');
const lines = rfs.split('\n');
const preMap = new Map();
let columns;  
let year;
let prefecture;
let popu;
let value;

for (let line of lines) {

//  let columns = line.split(',');  
//  let year = parseInt(columns[0]);
//  let prefecture = columns[1];
//  let popu = parseInt(columns[3]);

  columns = line.split(',');  
  year = parseInt(columns[0]);
  prefecture = columns[1];
  popu = parseInt(columns[3]);

  if(year === 2010 || year === 2015){
//    let value = preMap.get(prefecture);
  value = preMap.get(prefecture);
    if(!value){
      value = {
        popu10: 0,
        popu15: 0,
        change: null
      }
    }
    if(year == 2010){
      value.popu10 = popu;
    }
    if(year == 2015){
      value.popu15 = popu;
    }
    preMap.set(prefecture, value);
  }
}

for(let[key, value] of preMap) {
  value.change = value.popu15 / value.popu10;
}
const rankingArray = Array.from(preMap).sort((pair1, pair2) => {
  return pair2[1].change - pair1[1].change;
});
const rankingStrings = rankingArray.map(([key, value]) => {
  return key + ': ' + value.popu10 + '=>' + value.popu15 + ' 変化率：' + value.change;
});

console.log(rankingStrings);