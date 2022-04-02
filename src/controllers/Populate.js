const { Sequelize, Op } = require('sequelize');
const productos = require('../data/productsCleanWithOutUndefinedSecondTry.json');
const { Products } = require('../db');

const temp = [
    {
        "id_product": 2000459086,
        "name": "Strangers Baseball Cap",
        "authorized_refund": false,
        "price": 12.99,
        "description": "DetailsA woven baseball cap featuring a front \"Strangers\" text rubber applique, curved brim, eyelets, buttoned top, and adjustable back strap.Content + Care- 100% cottonSize + Fit- Circumference: 23\"- Brim: 3\"",
        "brand": "21MEN",
        "is_offer": false,
        "variants": [
            {
                "ColorName": "BLACK/RED",
                "Stocks": {
                    "ONE SIZE": 108
                },
                "ProductImages": [
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw334da0a7/2_side_750/00459086-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwa54a165f/3_back_750/00459086-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw26f980c0/4_full_750/00459086-01.jpg"
                ],
                "SwatchImage": "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwb4008630/sw_22/00459086-01.jpg"
            }
        ],
        "delete": false,
        "default_image": "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
        "collection": 1,
        "id_category": 3
    },
    {
        "id_product": 2000457117,
        "name": "Embroidered FUBU Baseball Cap",
        "authorized_refund": false,
        "price": 7.49,
        "description": "DetailsFrom our Forever 21 x FUBU collection, this woven baseball cap features front \"FUBU\" embroidery and a curved brim.- Officially licensed productContent + Care- 100% cotton- Hand wash coldSize + Fit- Circumference: 23\"- Brim: 3\"",
        "brand": "21MEN",
        "is_offer": true,
        "variants": [
            {
                "ColorName": "ORANGE/MULTI",
                "Stocks": {
                    "ONE SIZE": 24
                },
                "ProductImages": [
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw5a97c9a9/1_front_750/00457117-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw5a97c9a9/1_front_750/00457117-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwfaedf0af/2_side_750/00457117-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwcdc41094/3_back_750/00457117-01.jpg",
                    "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw5d5eff6a/4_full_750/00457117-01.jpg"
                ],
                "SwatchImage": "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw8a4c5a85/sw_22/00457117-01.jpg"
            }
        ],
        "delete": false,
        "default_image": "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw5a97c9a9/1_front_750/00457117-01.jpg",
        "collection": 2,
        "id_category": 3
    }
]


const dbFunctions = {
    populateDB: async (req, res) => {
        let response = await Products.bulkCreate(
            productos,
            {
            ignoreDuplicates: true
            }
        )
        try {
            res.status(200).json(response);
        } catch (error) {
            console.log('ERROR_____________________\n' + error.message + error.filename + error.lineNumber + error.stack);
            res.redirect(404, '../');
        }
    }
}

module.exports = dbFunctions;