const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Note = require('../model/Note');
const verifyToken = require('../middleware/verifyToken');

router.get('/:name', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name });
    let userNotes = await Note.findOne({ username: user.username });
    if (!userNotes) {
      userNotes = await Note.create({ username: user.username });
    }
    res.render('pages/main', {
      user: user,
      userNotes: userNotes,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/:name/new', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name }); // we require username and email
    res.render('pages/new', { user: user });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:name/:subject/add', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name });
    const note = {
      title: '',
      content: '',
    };
    res.render('pages/add', {
      user: user,
      note: note,
      subject: req.params.subject,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:name/:subject', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name });
    const userNotes = await Note.findOne({ username: user.username });
    const subjectNotes = userNotes.subjects.find(
      (subject) => subject.name === req.params.subject
    );
    res.render('pages/open', { user: user, subjectNotes: subjectNotes });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/:name/:subject/:slug', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name });
    const userNotes = await Note.findOne({ username: user.username });
    const note = userNotes.subjects
      .filter((subject) => {
        return subject.name === req.params.subject;
      })
      .pop()
      .notes.find((item) => item.slug === req.params.slug); // returns the note specific note object from the filtered subjects array
    res.render(`pages/read`, {
      user: user,
      note: note,
      subject: req.params.subject,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/:name/:subject/:slug/edit', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.name });
    const userNotes = await Note.findOne({ username: user.username });
    const note = userNotes.subjects
      .filter((sub) => {
        return sub.name === req.params.subject;
      })
      .pop()
      .notes.find((item) => item.slug === req.params.slug);
    res.render(`pages/edit`, {
      user: user,
      note: note,
      subject: req.params.subject,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
