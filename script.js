//import * as fs from 'node:fs'; // import
const fs = require('node:fs'); //same import with different syntax

/*try {
  const data = fs.readFileSync('file.json', 'utf8'); //Szinkron művelet, ameddig ez a sor nem fut le, addig a többi sem fog
  console.log(data);
  const jsonData = JSON.parse(data)
  console.log(jsonData.key)
} catch (err) {
  console.error('Error reading the file:', err); //Tájékoztatjuk a usert, hogy az olvasáskor történt valami probléma (try-catch)
} */

fs.readFile('file.json', 'utf8', (err, data) => { //Aszinkkron művelet, első sor nem tudja azonnal befejezni a futását, háttérbe vonul és elkezd futni a többi kódsor
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    console.log(data);

    try {
        const jsonData = JSON.parse(data);
        console.log(jsonData.key)
    } catch (parseErr) {
        console.err('Error at parsing the data', data)
    }
  });
