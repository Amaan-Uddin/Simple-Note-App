# Simple Note Taking App

This is a simple note-taking app where users can sign up or log in to create subject directories. Inside each directory, users can add, view, edit, and delete notes for specific subjects. The app provides a seamless way to organize and keep track of notes, with the ability to delete subject directories as well.

## Features

- User authentication: Sign up and log in to the app securely.
- Subject directories: Create directories to categorize notes by subjects.
- Note management: Add, view, edit, and delete notes within each subject directory.
- Subject deletion: Easily delete entire subject directories.
- User-friendly interface: Intuitive and user-friendly design for a smooth note-taking experience.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side application development.
- **Express**: Web application framework for building robust and scalable apps.
- **MongoDB**: NoSQL document database for flexible and scalable data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **EJS**: Templating engine for generating dynamic HTML content.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/simple-note-taking-app.git

   ```

2. Install dependencies:

   `cd simple-note-taking-appbr`

   `npm install`

3. Set up the MongoDB connection:

   - Make sure you have MongoDB installed and running.
   - Update the MongoDB connection URL in the project's configuration file.

4. Configure JWT tokens:

   - Generate an access token secret and refresh token secret.
   - Update the JWT configuration in the project's configuration file, including the secret keys.

5. Start the server

   `npm start`

6. Open your web browser and visit `http://localhost:3000` to access the app.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the app, feel free to submit a pull request. Please follow the existing code style and guidelines.

## License

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)

Thank you for using our Simple Note Taking App! If you have any questions or need assistance, please feel free to reach out.
