const productos = require('../data/productsCleanWithOutUndefinedSecondTry.json');

let p2= productos.map(p=>p.variants);
let price_offer
productos.forEach(element => {
    element.price_offer=element.price;
    if(element.is_offer){
        element.price=element.price_offer-(element.price_offer*(Math.random() * (5 - 14) + 5)/100);
    }
});
console.log(productos[0]);

const fs = require('fs')

 /* fs.writeFile('productsModified.json', JSON.stringify(productos),'utf8', (err) => { 
    if (err) throw err; 
    console.log('The file has been saved!');  
  });  */