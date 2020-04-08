'use strict';
//2020年において、各都道府県で男女それぞれの全世代の合計値の差が大きい順に出力する

const fs = require('fs');
const preMap = new Map();

fs.readFile('./master-popu-pref.csv', 'utf-8', (err, data) => {
  const lines = data.split('\n');

  for (let line of lines) {
    const columns = line.split(',');
    const year = parseInt(columns[0]);
    const pre = columns[2];
    const gender = columns[3];

    //2020のみ
    if (year === 2020) {
      let value = preMap.get(pre);
      if (!value) {
        value = {
          fsum: 0,
          msum: 0,
          diff: 0,
        };
      }
      //全世代の合計
      let sum = 0;
      for (let i = 4; i < columns.length; i++) {
        sum = sum + parseInt(columns[i]);
      }
      switch (gender) {
        case '男':
          value.msum = sum;
          break;
        case '女':
          value.fsum = sum;
          break;
        default:
          break;
      }
      preMap.set(pre, value);
    }
  }

  for (let [key, value] of preMap) {
    value.diff = value.fsum - value.msum;
  }
  const rankingArray = Array.from(preMap).sort((pair1, pair2) => {
    return pair2[1].diff - pair1[1].diff;
  });
  const rankingStrings = rankingArray.map(([key, value]) => {
    return key + ': ' + '男 ' + value.msum + ' ⇔ 女 ' + value.fsum + ' 差: ' + value.diff;
  });
  console.log(rankingStrings);
});
