'use strict';
const fs = require('fs');
const preMap = new Map();

fs.readFile('./popu-pref.csv', 'utf-8', (err, data) => {
  const lines = data.split('\n');

  for (let line of lines) {
    const columns = line.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);

    if (year === 2010 || year === 2015) {
      let value = preMap.get(prefecture);
      if (!value) {
        value = {
          popu10: 0,
          popu15: 0,
          change: null,
        };
      }
      if (year == 2010) {
        value.popu10 = popu;
      }
      if (year == 2015) {
        value.popu15 = popu;
      }
      preMap.set(prefecture, value);
    }
  }

  for (let [key, value] of preMap) {
    value.change = value.popu15 / value.popu10;
  }
  const rankingArray = Array.from(preMap).sort((pair1, pair2) => {
    return pair2[1].change - pair1[1].change;
  });
  const rankingStrings = rankingArray.map(([key, value]) => {
    return key + ': ' + value.popu10 + '=>' + value.popu15 + ' 変化率：' + value.change;
  });
  console.log(rankingStrings);
});
