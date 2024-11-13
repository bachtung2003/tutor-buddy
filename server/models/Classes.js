module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define("Classes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  // Define associations
  Classes.associate = (models) => {
    Classes.hasMany(models.Students, {
      onDelete: "cascade",
    });
  };

  return Classes;
};
