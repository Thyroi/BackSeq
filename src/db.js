require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = process.env.NODE_ENV === 'production'
		? new Sequelize({
				database: DB_NAME,
				dialect: 'postgres',
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
				{
					logging: false, // set to console.log to see the raw SQL queries
					native: false, // lets Sequelize know we can use pg-native for ~30% more speed
          dialectOptions: {
  					ssl: {
  						require: true,
  						rejectUnauthorized: false,
  					}
				}
      }
    );

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const basename = path.basename(__filename);

const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
modelDefiners.forEach(model => model(sequelize));

const {
  Cart,
  Products,
  Category,
  Collection,
  List,
  Favorites,
  Review,
  ProductsCategories,
  PurchaseOrder,
  Client,
  Users,
  Invoice
} = sequelize.models;



Products.belongsToMany(Category, { through: 'ProductsCategories' , timestamps: false});
Category.belongsToMany(Products, { through: 'ProductsCategories' });
Category.hasMany(Category);
Category.belongsTo(Category);

Collection.hasMany(Products);
Products.belongsTo(Collection);
Client.hasOne(Cart, /* {foreignKey:'clientId'} */);
Cart.belongsTo(Client);
Client.hasMany(PurchaseOrder,/* {foreignKey:'clientId'} */);
PurchaseOrder.belongsTo(Client);
PurchaseOrder.hasOne(Invoice);
Invoice.belongsTo(PurchaseOrder);

Products.hasMany(Review);
Review.belongsTo(Products);
Client.hasMany(Review);
Review.belongsTo(Client);

Client.hasMany(List);
List.belongsTo(Client);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
