module.exports = (sequelize, DataTypes) => {
  const Lessons = sequelize.define("Lessons", {
    lesson_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    lesson_url: {
      type: DataTypes.STRING,
    },
  });

  Lessons.associate = (models) => {
    Lessons.hasMany(models.Assignments, {
      foreignKey: "lesson_id",
      onDelete: "cascade",
    });
  };

  return Lessons;
};