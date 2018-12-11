var db = require("../models");

module.exports = function(app) {
  app.get("/", function (req, res) {
    db.Party.findAll({}).then(function (dbParty) {
      var hbsObject = {
        party: dbParty,
        title: "Wi_Party | Home"
      };
      res.render("intro", hbsObject);
    });
  });

  app.get("/partytime", function(req, res) {
    res.render("index", { title: "Wi_Party | PartyTime" });
  });

  app.get("/parties/:id", (req, res) => {
    db.Party.findOne({where: {id: req.params.id}}).then(party => {
      res.render('party', {party, title: `wi-Party - ${party.eventName}`, partial: `sample`});
    });
  }); 
};
