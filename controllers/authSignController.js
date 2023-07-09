const User = require('../model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const tokens = require('../config/tokens');

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body; // re-assign all the data from the request body object

  const duplicateUser = await User.findOne({ email: email });
  if (duplicateUser) {
    return res.sendStatus(406); // not acceptable
  }

  try {
    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    const refreshToken = tokens.refreshToken(name);
    const accessToken = tokens.accessToken(name);

    // create a document for the new user
    const user = await User.create({
      username: name,
      email: email,
      password: hashPassword,
      refreshToken: refreshToken,
    });

    console.log(user);

    res.cookie('access', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.redirect(`/main/${name}`);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = handleNewUser;
