module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define("Answers", {
    answer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assignments",
        key: "assignment_id",
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  // Associations
  Answers.associate = (models) => {
    Answers.belongsTo(models.Assignments, {
      foreignKey: "assignment_id",
      as: "assignment",
    });
  };

  return Answers;
};
