const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://ddgtzexdoamtzi:77725ff983fdc03b57e2b68721b4ea644df1e9598a7c3d598f115936b28b7724@ec2-44-194-92-192.compute-1.amazonaws.com:5432/d4mjv55hcavib9',
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)



const testear = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log("AQUI_NO_LLEGO________________________\n" + sequelize)
}
testear();

module.exports = {
    conn: sequelize
}