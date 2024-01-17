const Sequelize = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('Vassystem','Huevang', 'Hue@4517', {
	host: '172.28.17.125',
	dialect: 'mssql',
	dialectOptions: {
        userUTC:true,
        options:{
            "encrypt":false,
		requestTimeout: 40000,
        }
	},
	pool: {
		max: 5, 
		min: 0,
		acquire: 60000,
		idle: 20000
	  },
	logging: false,
});

// Test the connection to the database
sequelize.authenticate()
	.then(() => {
		console.log('Connected to SqlServer database!');
	})
	.catch((err) => {
		console.error('Error connecting to MySQL database: ', err);
	});
    sequelize.sync();

module.exports = sequelize;