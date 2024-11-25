module.exports = (sequelize, DataTypes) => {
  const Assignments = sequelize.define("Assignments", {
    assignment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });

  return Assignments;
};
