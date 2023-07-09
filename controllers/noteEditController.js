const Note = require('../model/Note');

const handleEditNote = async (req, res) => {
  const username = req.params.name;
  const { subject, title, content } = req.body;

  const findUser = await Note.findOne({ username: username });
  if (!findUser) {
    return res
      .status(404)
      .send(`NOT_FOUND: User ${username} not found in the database `);
  }

  try {
    const userNotes = await Note.findOne({ username: username });
    const noteIndex = userNotes.subjects
      .filter((sub) => {
        return sub.name === subject;
      })
      .pop()
      .notes.findIndex((item) => item.slug === req.params.slug);

    const result = await Note.updateOne(
      { _id: findUser._id, 'subjects.name': subject },
      {
        $set: {
          [`subjects.$.notes.${noteIndex}.title`]: title,
          [`subjects.$.notes.${noteIndex}.content`]: content,
        },
      },
      { arrayFilters: [{ noteIndex: noteIndex }] }
    );
    // The reason for using the square brackets is that they indicate the position-based operator $ is being
    // used in the context of an array.
    console.log(result);
    if (result.modifiedCount === 0) {
      return res.status(400).send(`BAD_REQUEST: No Update.`);
    }
    res.redirect(`/main/${username}/${subject}`);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = handleEditNote;
