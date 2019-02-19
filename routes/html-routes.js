var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Party.findAll({}).then(function(dbParty) {
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
    console.log(req.params.id);
    db.Attendee.findAll({
      where: {
        PartyId: req.params.id
      },
      include: [
        {
          model: db.Item
        },
        {
          model: db.Party
        }
      ]
    })
      .then(data => {
        var partyInfo = {};
        // below algorithm map's out the contents of teh returned
        data.map(oneAttendee => {
          partyInfo.host = oneAttendee.Party.displayName;
          partyInfo.eventAddress = oneAttendee.Party.eventAddress;
          partyInfo.eventTime = oneAttendee.Party.eventTime;
          partyInfo.eventName = oneAttendee.Party.eventName;
        });

        partyInfoArray = [partyInfo];

        // res.send(data);
        res.render("party", {
          Attendees: data,
          PartyData: partyInfoArray,
          title: `wi-Party - ${partyInfo.eventName}`,
          partial: "sample"
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
