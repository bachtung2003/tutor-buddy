module.exports = (sequelize, DataTypes) => {
  const Student_Courses = sequelize.define("Student_Courses", {
    student_course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completion_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Student_Courses.associate = (models) => {
    Student_Courses.belongsTo(models.Courses, {
      foreignKey: "course_id",
      as: "Student",
    });
  };

  return Student_Courses;
};
