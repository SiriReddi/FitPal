const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  //Day Controller
  createDay: function(req, res) {
    db.Day.findOne({
      date: req.body.date,
      userId: req.body.userId,
      weight: req.body.weight
    }).then(dbDay => {
      if (dbDay) {
        return res.json(dbDay);
      } else {
        db.Day.create(req.body).then(newDbDay => {
          db.User.findById({ _id: req.body.userId }).then(dbUser => {
            dbUser.days.push(newDbDay._id);
            dbUser.save();
          });
          return res.json(newDbDay);
        });
      }
    });
  },

  updateWeight: function(req, res) {
    db.Day.findOne({ _id: req.body.id })
      .then(dbDay => {
        dbDay.weight = req.body.weight;
        dbDay.save();
        return res.json(db.Day);
      })
      .catch(err => res.status(422).json(err));
  },

  //Update Water for the day

  addWater: function(req, res) {
    db.Day.findOne({ _id: req.body.id })
      .then(dbModel => {
        dbModel.Water = req.body.water;
        dbModel.save();
        return res.json(dbModel);
      })
      .catch(err => console.log("err", err.message));
  },

  findDayByuserId: function(req, res) {
    db.Day.find({ userId: req.params.userId }, null, {
      sort: { date: -1 },
      limit: 7
    })
      .populate("exercises")
      .then(dbDays => {
        return res.json(dbDays);
      })
      .catch(err => res.status(422).json(err));
  },

  findDayWeightByuserId: function(req, res) {
    db.Day.find({ userId: req.params.userId }, null, {
      sort: { date: -1 },
      limit: 30
    })
      .then(dbDays => {
        return res.json(dbDays);
      })
      .catch(err => res.status(422).json(err));
  }
};
