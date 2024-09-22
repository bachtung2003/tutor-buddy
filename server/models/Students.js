module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("Students", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING(50),
    },
    contact: {
      type: DataTypes.STRING(11),
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  return Students;
};
