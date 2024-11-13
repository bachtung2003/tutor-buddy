module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define associations
  Users.associate = (models) => {
    Users.hasMany(models.Classes, {
      onDelete: "cascade",
    });
  };

  return Users;
};
