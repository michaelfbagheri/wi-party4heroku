module.exports = function(sequelize, DataTypes) {
  var Party = sequelize.define("Party", {
    // Giving the Author model a name of type STRING
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    AuthenticationId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventDescription: {
      type: DataTypes.STRING,
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

  Party.associate = function(models) {
    Party.hasMany(models.Attendee, {
      onDelete: "cascade"
    });
  };

  Party.associate = function(models) {
    Party.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return Party;
};
