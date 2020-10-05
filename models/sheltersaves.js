module.exports = (sequelize, DataTypes) => {
    const shelterSave = sequelize.define("dogs", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return shelterSave;
}