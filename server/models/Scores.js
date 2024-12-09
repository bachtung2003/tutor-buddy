module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define("Scores", {
    score_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // References the Students model
        key: "user_id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Courses", // References the Courses model
        key: "course_id",
      },
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Lessons", // References the Assignments model
        key: "lesson_id",
      },
    },
    score: {
      type: DataTypes.FLOAT, // Stores the score of the assignment
      allowNull: false,
    },
  });

  Scores.associate = (models) => {
    Scores.belongsTo(models.Users, {
      foreignKey: "student_id",
      onDelete: "cascade",
    });
    Scores.belongsTo(models.Courses, {
      foreignKey: "course_id",
      onDelete: "cascade",
    });
    Scores.belongsTo(models.Lessons, {
      foreignKey: "lesson_id",
      onDelete: "cascade",
    });
  };

  return Scores;
};
