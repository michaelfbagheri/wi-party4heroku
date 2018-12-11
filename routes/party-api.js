var db = require("../models");

module.exports = function (app) {
  app.post("/api/users", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      Authentication: req.body.Authentication
    }).then(function (dbUser) {
      res.send(dbUser);
    });
  });

  app.get("/api/parties", function (req, res) {
    db.Party.findAll({}).then(function (dbParty) {
      res.send(dbParty)
    });
  });

  app.post("/api/parties", function (req, res) {
    db.Party.create({
      eventName: req.body.eventName,
      eventAddress: req.body.eventAddress,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      eventHostAuthenticationId: req.body.eventHostAuthenticationId,
      eventZip: req.body.eventZipCode,
      eventDescription: req.body.eventDiscription
    }).then(function (dbParty) {
      res.send(dbParty);
    }).catch(err => res.send(err));
  });

  app.delete("/api/parties/:id", function (req, res) {
    db.Party.destroy({ where: { id: req.params.id } }).then(party => {
      res.send({ msg: 'Party record deleted' });
    }).catch(err => res.send(err))
  });
};
