const Note = require('../model/Note');

const removeNote = async (req, res) => {
  const username = req.params.name;
  const subject = req.params.subject;

  const findUser = await Note.findOne({ username: username });
  if (!findUser) {
    return res
      .status(404)
      .send(`NOT_FOUND: User ${username} not found in the database`);
  }

  try {
    const userNotes = await Note.findOne({ username: username });
    const note = userNotes.subjects
      .filter((sub) => {
        {
          return sub.name === subject;
        }
      })
      .pop()
      .notes.filter((note) => note.slug !== req.params.slug);

    await Note.updateOne(
      { _id: findUser._id, 'subjects.name': subject },
      {
        $set: {
          'subjects.$.notes': note,
        },
      }
    );
    // working:
    // we are essentially getting all the elements inside of the subjects Array that match the query with the help of '$[]'
    // we are targeting a specific subject and setting the new filtered note Array to 'notes' Array inside
    // the queried subject
    // the .$ will get only the mathched element/object in the Array

    res.redirect(`/main/${username}/${subject}`);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = removeNote;
