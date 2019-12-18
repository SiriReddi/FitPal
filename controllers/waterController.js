const db = require("../models");

module.exports = {
  //Water Controllers
  addWater: function(req, res) {
    db.Water.create({
      water: req.body.water
    })
      .then(waterModel => {
        console.log("id is empty:", req.body);
        db.Day.findById({ _id: req.body.id })
          .then(dayModel => {
            dayModel.waters.push(waterModel._id);

            dayModel.save();
            return res.send("Water Added");
          })
          .catch(err => res.status(422).json(err));
        console.log("err", err.message);
        return res.send("Water Not Added");
      })
      .catch(err => res.status(422).json(err));
    return res.send("Water Not Added2");
  }
};
