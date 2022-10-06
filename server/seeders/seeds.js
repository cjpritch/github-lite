const faker = require('faker');

const db = require('../config/connection');
const { Project, User } = require('../models');

db.once('open', async () => {
  await Project.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  
//   console.log(createdUsers);

  // create friends
  // this logic commented out because no friends in this app.  kept here because I may want to refer to it when I get around to seeding the tags below
//   for (let i = 0; i < 100; i += 1) {
//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { _id: userId } = createdUsers.ops[randomUserIndex];

//     let friendId = userId;

//     while (friendId === userId) {
    //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//       friendId = createdUsers.ops[randomUserIndex];
//     }

//     await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
//   }

  // create Projects
  let createdProjects = [];

  for (let i = 0; i < 100; i += 1) {
    const title = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const link = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdProject = await Project.create({ title, description, link, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { Projects: createdProject._id } }
    );

    createdProjects.push(createdProject);
  }

  // create tags

  // need list of tags to choose from, following logic will then be changed to choose tags randomly and then apply them to the projects created above

//   for (let i = 0; i < 100; i += 1) {
//     const name = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username } = createdUsers.ops[randomUserIndex];

//     const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
//     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

//     await Thought.updateOne(
//       { _id: thoughtId },
//       { $push: { reactions: { reactionBody, username } } },
//       { runValidators: true }
//     );
//   }

  console.log('all done!');
  process.exit(0);
});
