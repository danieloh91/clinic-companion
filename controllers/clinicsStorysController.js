var db = require('../models');

function create(req, res) {
  var storyData = {
    story_content: req.body.story_content
  };
  var clinicId = req.params.clinicId;
  db.Story.create(storyData, function (err, createdStory) {
    if (err) {res.sendStatus(404);}
    db.Clinic.findById(clinicId, function (err, clinicFound) {
    createdStory.clinic = clinicFound;
    createdStory.save(function (err, finalStory) {
      if (err) {res.sendStatus(404);}
      res.json(finalStory);
        });
    });
  });
}

function index(req, res) {
  var storyList=[];
  db.Story.find({})
    .populate('username')
    .populate('clinic')
    .exec(function(err, foundStorys) {
        if (err) { res.sendStatus(404); }
        foundStorys.forEach(function(storySearch) {
          var test = storySearch.clinic._id;
          if (test == req.params.clinicId) {
            storyList.push(storySearch);
          }
          });
          res.json(storyList);
      });
    }


// export public methods here
module.exports = {
  index: index,
  create: create,
};
