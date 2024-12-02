const { type } = require("os");

module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define(
    "Answers",
    {
      answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["assignment_id", "answer_id"],
        },
      ],
    }
  );

  Answers.associate = (models) => {
    Answers.belongsTo(models.Assignments, {
      foreignKey: "assignment_id",
      as: "assignment",
      onDelete: "cascade",
    });
  };

  return Answers;
};
