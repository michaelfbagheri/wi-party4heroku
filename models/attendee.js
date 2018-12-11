module.exports = function(sequelize, DataTypes) {
  var Attendee = sequelize.define("Attendee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    AuthenticationId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    partyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Attendee.associate = function(models) {
    Attendee.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Attendee;
};
