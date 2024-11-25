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
        model: "Students", // References the Students model
        key: "id",
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
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assignments", // References the Assignments model
        key: "assignment_id",
      },
    },
    score: {
      type: DataTypes.FLOAT, // Stores the score of the assignment
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if the course is completed
    },
  });

  Scores.associate = (models) => {
    Scores.belongsTo(models.Students, {
      foreignKey: "student_id",
      onDelete: "CASCADE",
    });
    Scores.belongsTo(models.Courses, {
      foreignKey: "course_id",
      onDelete: "CASCADE",
    });
    Scores.belongsTo(models.Assignments, {
      foreignKey: "assignment_id",
      onDelete: "CASCADE",
    });
  };

  return Scores;
};
