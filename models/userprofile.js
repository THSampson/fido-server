module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("profile", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false
        },
     hasKids: {
         type: DataTypes.BOOLEAN,
         allowNull: false
     },
     otherPets: {
         type: DataTypes.BOOLEAN,
         allowNull: false
     },
      
     location: {
         type: DataTypes.STRING,
         allowNull: false
     },
 

     })
return Profile;
};