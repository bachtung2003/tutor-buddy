module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "teacher", "student"),
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Courses, {
      foreignKey: "teacher_id",
      onDelete: "cascade",
    });

    Users.hasMany(models.Blogs, {
      foreignKey: "teacher_id",
      onDelete: "cascade",
    });

    Users.hasMany(models.Student_Courses, {
      foreignKey: "student_id",
      onDelete: "cascade",
    });

    Users.hasMany(models.Reviews, {
      foreignKey: "student_id",
      onDelete: "cascade",
    });

    Users.hasMany(models.Scores, {
      foreignKey: "student_id",
      onDelete: "cascade",
    });
  };

  return Users;
};
