const slugify = require('slugify');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const noteSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      notes: [
        {
          title: {
            type: String,
          },
          content: {
            type: String,
          },
          slug: {
            type: String,
          },
        },
      ],
    },
  ],
});

// In Mongoose, a getter is a function that allows you to define custom behavior when retrieving a specific property
// or path from a document. It allows you to transform the data before it is returned.

noteSchema.path('subjects.notes').get(function (notes) {
  return notes.map((note) => {
    return {
      ...note._doc,
      content: DOMPurify.sanitize(note.content),
      slug: slugify(note.title, { lower: true }),
    };
  });
});

// Middleware to generate and assign the slug before saving the document
noteSchema.pre('save', function (next) {
  const document = this;
  document.subjects.forEach((subject) => {
    subject.notes.forEach((note) => {
      if (note.title && note.isModified('title')) {
        note.slug = slugify(note.title, { lower: true });
      }
      if (note.content && note.isModified('content')) {
        note.content = DOMPurify.sanitize(note.content);
      }
    });
  });

  next();
});

module.exports = mongoose.model('Note', noteSchema);
