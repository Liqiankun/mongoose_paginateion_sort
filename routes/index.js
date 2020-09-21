var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model('User', UserSchema);

/* GET home page. */
router.get('/create_fake_data', function (req, res, next) {
  const fakeDataArray = [];
  for (let index = 0; index < 20; index++) {
    fakeDataArray.push({ name: `user_${index}` });
  }
  UserModel.create(fakeDataArray, (err) => {
    if (err) {
      res.json({ status: 400, message: err.message });
    } else {
      res.json({ status: 200, message: 'Create fake data success' });
    }
  });
});

router.get('/users', function (req, res, next) {
  UserModel.paginate(
    {},
    {
      page: req.query.page,
      limit: 2,
      sort: { createdAt: -1 },
    },
    function (err, result) {
      if (err) {
        res.json({ status: 400, message: err.message });
      } else {
        res.json({ status: 200, users: result.docs });
      }
    }
  );
});

module.exports = router;
