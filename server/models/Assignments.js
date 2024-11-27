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
  });

  Assignments.associate = (models) => {
    Assignments.hasMany(models.Answers, {
      foreignKey: "assignment_id",
      as: "answers",
      onDelete: "cascade", // Deletes associated answers when assignment is deleted
    });

    Assignments.belongsTo(models.Lessons, {
      foreignKey: "lesson_id",
      as: "lesson",
    });
  };

  return Assignments;
};
