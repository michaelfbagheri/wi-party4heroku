module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    qtyRequested: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    qtyCommited: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    hostAdded: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    // partyId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    AuthenticationId: {
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

  Item.associate = function(models) {
    Item.belongsTo(models.Party, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  // Item.associate = function(models) {
  //   Item.belongsTo(models.Party, {
  //     onDelete: "cascade"
  //   });
  // };

  return Item;
};
