module.exports = function(sequelize, DataTypes) {
  var Attendee = sequelize.define("Attendee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Attendee;
};
