const productos = require('../data/productsCleanWithOutUndefinedSecondTry.json');

let p2= productos.map(p=>p.variants);

productos.forEach(element => {
    element.variants.forEach(v=>{
        v.ProductImages.shift();
    })   
});
console.log(productos[0].variants);

const fs = require('fs')

fs.writeFile('productsModified.json', JSON.stringify(productos),'utf8', (err) => { 
    if (err) throw err; 
    console.log('The file has been saved!');  
  });