const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres'
});

sequelize.authenticate()
.then(() => console.log("postgres db is connected"))
.catch(err => console.log(err));

User = sequelize.import('./models/user');
Profile = sequelize.import('./models/userprofile');
Favorites = sequelize.import('./models/favorites')

Profile.belongsTo(User);
User.hasOne(Profile);
Favorites.belongsTo(Profile)
Profile.hasMany(Favorites)




module.exports = sequelize;