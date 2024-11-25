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

  return Student_Courses;
};
