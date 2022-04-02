const axios = require('axios')
const { Products, Category } = require('../db')
module.exports = {
    getByCategory: async (id) => {
        const details = await Category.findByPk(

            id
            ,
            {
                include: [{
                    model: Products,
                    through: {
                        attributes: []
                    }
                }]
            }
        );
        return details
    }
}