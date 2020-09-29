module.exports = (sequelize, DataTypes) => {
    const Fido = sequelize.define("fido", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goodWithChildren: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        goodWithDogs: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        goodWithCats: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        ownerID: {
            type: DataTypes.INTEGER
         }
    })
    return Fido;
}