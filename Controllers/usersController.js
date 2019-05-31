const User = require('../Models/user.js');

const userController = function() {
  function addNewUser(req, res) {
    //outer function

    if (req.body.firstName) {
      let newUser = new User(req.body);
      newUser.save((err, user) => {
        console.log(err);
        res.status(201).json({
          user: user,
          success: true
        });
      });
    } else {
      res.status(400).json({ err: 'Missing Parameters' });
    }
  }

  function generateToken() {
    // inner function
  }
  function login(req, res) {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).json({ msg: 'invalid credantials' });
    }
    User.findOneAndUpdate(
      req.body,
      { $set: { lastLogin: Date.now() }, $inc: { visitCount: 1 } },
      {
        fields: {
          userName: 1,
          firstName: 1,
          lastName: 1,
          lastLogin: 1,
          visitCount: 1
        },
        new: true
      },
      (err, user) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          if (user) {
            // create token
            return res.status(200).json({ token: '', user: user });
          }
          return res.status(401).json({});
        }
      }
    );
  }

  function getAllUsers(req, res) {
    User.find({}, { date: 0 }, (err, users) => {
      //first {} == condition; second {} = selectors make sure to write only zero for exclode or only one for include
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(users);
      }
    });
  }

  return {
    addUser: addNewUser,
    getAllUsers: getAllUsers,
    login: login
  };
};

module.exports = userController();
