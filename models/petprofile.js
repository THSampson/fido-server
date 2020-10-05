module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define("pet", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
     },
     breed: {
         type: DataTypes.STRING,
         allowNull: false
     }

    })
return Pet;
};