/************
 * DATABASE *
 ************/

var db = require('../models');

// function create(req, res) {
//   var newStory = req.body;
//   db.Story.create(newStory, function (err, newStory) {
//     if (err) {res.sendStatus(404);}
//     res.json(newStory);
//   });
// }

function index(req, res) {
  console.log(req.params.clinicId);
  db.Story.find({})
    .populate('username')
    .populate('clinic')
    .exec(function(err, foundStorys) {
        if (err) { res.sendStatus(404); }
            console.log("!!!" + foundStorys[0]._id );
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
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update,
};
