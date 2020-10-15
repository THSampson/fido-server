module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define("favorite", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
         type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
   
        
    })
    return Favorites;
}