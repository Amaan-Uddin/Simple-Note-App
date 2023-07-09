const Note = require('../model/Note');

const handleNewNote = async (req, res) => {
  // check if we only need to add a subject
  if (!req.body.title || !req.body.content) {
    return handleNewSubject(req, res);
  }

  // breakdown the req.body and also the username from the URL
  const { subject, title, content } = req.body;
  const username = req.params.name;

  // find the user in our 'notes' collection
  const findUser = await Note.findOne({ username: username });
  if (!findUser) {
    return res
      .status(404)
      .send(`Not_Found: User ${username} not found in the database.`);
  }

  try {
    // check if the subjects array has a subject of the same name
    if (checkSubject(findUser, subject)) {
      return res.sendStatus(406);
    }

    // if not, then update the document
    await Note.updateOne(
      { _id: findUser._id },
      {
        $push: {
          subjects: {
            name: subject,
            notes: [
              {
                title: title,
                content: content,
              },
            ],
          },
        },
      }
    );

    // when we have existing subjects and we require to add new notes then we push to the notes array
    // { $push: { 'subjects.$.notes': newNote } }

    res.redirect(`/main/${username}`);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const handleNewSubject = async (req, res) => {
  // aquire the subject from request body
  const { subject } = req.body;
  const username = req.params.name;

  // find the existing user that matches the name in the URL
  const findUser = await Note.findOne({ username: username });
  if (!findUser) {
    return res
      .status(404)
      .send(`Not_Found: User ${username} not found in the database.`);
  }

  try {
    // perform subject checking
    if (checkSubject(findUser, subject)) {
      return res
        .status(409)
        .send(
          `Conflict: Subject ${subject} already exists in the user database.`
        );
    }

    // if it's a new subject then push to the subjects array a new object
    await Note.updateOne(
      { _id: findUser._id },
      { $push: { subjects: { name: subject, notes: [] } } }
    );

    res.redirect(`/main/${username}/${subject}`);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const checkSubject = (doc, checkName) => {
  const result = doc.subjects.some((subjects) => {
    if (subjects.name === checkName) return true;
  });
  return result;
};

module.exports = handleNewNote;
