const { Category, Collection } = require('../db');

module.exports =  {
    getCategories: async() =>{
        
        try{
            let women = await Category.findAll({
                where:{
                    CategoryIdCategory : 1
                }
            });
            let men = await Category.findAll({
                where:{
                    CategoryIdCategory : 2
                }
            })
            return [ women, men ]
        }catch(error){
            return error.data
        }
        
    },
    getCollections: async() =>{
        
        try{
            let hasData = await Collection.findAll();
            return !hasData.length
            ? { status: 200, mesagge: 'Esta vacia la tabla.', data :'Theres no data to show' }
            : { status: 200, mesagge: 'OK. The request has succeeded.', data : hasData } ;
        }catch(error){
            return error.data
        }
        
    }
};