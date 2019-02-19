var db = require("../models");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      AuthenticationId: req.body.Authentication
    }).then(function(dbUser) {
      res.send(dbUser);
    });
  });

  app.get("/api/parties", function(req, res) {
    db.Party.findAll({}).then(function(dbParty) {
      res.send(dbParty);
    });
  });

  app.post("/api/parties", function(req, res) {
    console.log("inside the api post for creating parties");
    console.log("here to create " + req.body.eventName);
    db.Party.create({
      eventName: req.body.eventName,
      eventAddress: req.body.eventAddress,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      AuthenticationId: req.body.eventHostAuthenticationId,
      eventDescription: req.body.eventDiscription,
      displayName: req.body.displayName
    })
      .then(function(dbParty) {
        console.log("following obj was created in the party table: " + dbParty);
        res.send(dbParty);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  });

  app.delete("/api/parties/:id", function(req, res) {
    db.Party.destroy({ where: { id: req.params.id } })
      .then(party => {
        console.log(party);
        res.send({ msg: "Party record deleted" });
      })
      .catch(err => res.send(err));
  });

  app.post("/attendee/:party/:id/:displayName", function(req, res) {
    console.log(req.params.party);
    console.log(req.params.displayName);
    db.Attendee.findOne({
      where: {
        AuthenticationId: req.params.id,
        PartyId: req.params.party
      }
    })
      .then(attendee => {
        if (!attendee) {
          return db.Attendee.create({
            AuthenticationId: req.params.id,
            PartyId: req.params.party,
            displayName: req.params.displayName
          })
            .then(dbAttendee => {
              console.log(`
          newly created record: ${dbAttendee}`);
              res.send(dbAttendee);
            })
            .catch(err => {
              console.log(err);
            });
        }
        res.send(attendee);
      })
      .catch(Error => {
        console.log(Error);
      });
  });

  app.post("/item/:party/:id", function(req, res) {
    console.log(req.params.id);
    console.log("name: " + req.params.id + "is trying to add an item");
    db.Attendee.findOne({
      where: {
        AuthenticationId: req.params.id,
        PartyId: req.params.party
      }
    })
      .then(attendee => {
        if (!attendee) {
          throw new Error("The attendee does not exist.");
        }
        return db.Item.create({
          //attendee.addItem({
          AttendeeId: attendee.id,
          PartyId: req.params.party,
          itemName: req.body.itemName,
          qtyRequested: req.body.itemQty,
          satisfied: true
        });
      })
      .then(function(dbItem) {
        console.log(dbItem.dataValues.itemName + " has been added to the Item table");
        res.send(dbItem);
      })
      .catch(function(error) {
        debugger;
        console.log(error);
      });
  });

  app.post("/items/commit", (req, res) => {
    console.log(`we want to modify ${req.body.itemId} by one`);
    db.Item.findOne({
      where: {
        id: req.body.itemId
      }
    })
      .then(data => {
        var newValue = data.qtyCommited + 1;
        if (data.qtyRequested === data.qtyCommited + 1) {
          var satisfiedOrder = false;
        } else {
          var satisfiedOrder = true;
        }
        return db.Item.update(
          {
            qtyCommited: newValue,
            satisfied: satisfiedOrder
          },
          {
            where: {
              id: data.id
            }
          }
        )
          .then(dbUpdate => {
            res.send(dbUpdate);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //API call shows all attendees of a particular party
  app.get("/item/:party", (req, res) => {
    db.Attendee.findAll({
      where: {
        PartyId: req.params.party
      }
    })
      .then(AllAttendees => {
        console.log(AllAttendees);
        res.send(AllAttendees);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //return all items that are being brough to a particular party along with who is bring them
  app.get("/items/:party", (req, res) => {
    db.Attendee.findAll({
      where: {
        PartyId: req.params.party
      },
      include: [
        {
          model: db.Item
        }
      ]
    })
      .then(AllAttendees => {
        // below algorithm map's out the contents of teh returned
        AllAttendees.map(oneAttendee => {
          console.log(
            `
            Display Name: ${oneAttendee.displayName}
            PartyID: ${oneAttendee.PartyId}
            `
          );
          oneAttendee.Items.map(item => {
            console.log(`
            item Name: ${item.itemName}
            item Qty: ${item.qtyRequested}
            `);
          });
        });
        res.send(AllAttendees);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
