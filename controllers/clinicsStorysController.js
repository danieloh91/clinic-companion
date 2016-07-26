/************
 * DATABASE *
 ************/

var db = require('../models');

function create(req, res) {
  console.log("YAAAY!");
  var storyData = {
    story_content: req.body.story_content
  };
  console.log(storyData);
  var clinicId = req.params.clinicId;
  console.log(clinicId);
  db.Story.create(storyData, function (err, createdStory) {
    if (err) {res.sendStatus(404);}
    db.Clinic.findById(clinicId, function (err, clinicFound) {
    console.log(clinicFound);
    console.log(createdStory);
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
  console.log(req.params.clinicId);
  db.Story.find({})
    .populate('username')
    .populate('clinic')
    .exec(function(err, foundStorys) {
        if (err) { res.sendStatus(404); }
        foundStorys.forEach(function(storySearch) {
          var test = storySearch.clinic._id;
          console.log(req.params.clinicId);
          if (test == req.params.clinicId) {
            console.log("found one!");
            storyList.push(storySearch);
          }
            // res.json(foundStorys);
          });
          res.json(storyList);
      });
    }

      // function index(req, res) {
      //   db.Story.clinic.findById(req.params.clinicId)
      //     .populate('username')
      //     .populate('clinic')
      //     .exec(function(err, foundStorys) {
      //         if (err) { res.sendStatus(404); }
      //         foundStorys.clinic.find({_id: req.params.clinicId})
      //           .populate('username')
      //           .populate('clinic')
      //           .exec(function(err, foundStorysClinic) {
      //             if (err) { res.sendStatus(404); }
      //             }
      //             res.json(foundStorysClinic);
      //
      //           });
      //       }
  // if (req.user!=="admin") {
  //  return res.sendStatus(401);
  // }


// function show(req, res) {
//   db.Story.findById(req.params.storyId)
//   .populate('username')
//   .populate('clinic')
//     .exec(function(err, story) {
//         if (err) { res.sendStatus(404); }
//         res.json(story);
//     });
// }

//
// function destroy(req, res) {
//   db.Story.findOneAndRemove({_id: req.params.storyId})
//   .populate('username')
//   .populate('clinic')
//     .exec(function(err, story){
// 		if (err) {
// 			res.sendStatus(404);
// 		}
// 		res.json(story);
// 	});
// }
//
// function update(req, res) {
//   db.Story.findByIdAndUpdate(req.params.storyId, req.body, {new: true})
//   .populate('username')
//   .populate('clinic')
//   .exec(function(err, story) {
//   if (err) {
// 		res.sendStatus(404);
// 		}
// 		res.json(story);
// 	});
// }



// export public methods here
module.exports = {
  index: index,
  create: create,
  // show: show,
  // destroy: destroy,
  // update: update,
};
