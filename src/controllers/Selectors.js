const { Category } = require('../db');

module.exports =  {
    getCategories: async() =>{
        
        try{
            let hasData = await Category.findAll();
            return !hasData.length
            ? { status: 200, mesagge: 'Esta vacia la tabla.', data :'Theres no data to show' }
            : { status: 200, mesagge: 'OK. The request has succeeded.', data : hasData } ;
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