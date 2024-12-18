module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.ENUM("English", "Vietnamese", "None"),
      defaultValue: "None",
    },
    objective: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    thumb_img: {
      type: DataTypes.STRING,
    },
  });

  Courses.associate = (models) => {
    Courses.hasMany(models.Lessons, {
      foreignKey: "course_id",
      onDelete: "cascade",
    });

    Courses.hasMany(models.Student_Courses, {
      foreignKey: "course_id",
      onDelete: "cascade",
      as: "Student",
    });

    Courses.hasMany(models.Reviews, {
      foreignKey: "course_id",
      onDelete: "cascade",
    });
    Courses.belongsTo(models.Users, {
      foreignKey: "teacher_id",
      as: "Teacher",
    });
  };

  return Courses;
};
