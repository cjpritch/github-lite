const faker = require('faker');

const db = require('../config/connection');
const { Project, User, Tag } = require('../models');

db.once('open', async () => {
    await Project.deleteMany({});
    await User.deleteMany({});
    // await Tag.deleteMany({});

    // create user data
    // const userData = [];

    // for (let i = 0; i < 50; i += 1) {
    //     const username = faker.internet.userName();
    //     const email = faker.internet.email(username);
    //     const password = faker.internet.password();

    //     userData.push({ username, email, password });
    // }

    // const createdUsers = await User.collection.insertMany(userData);


    // create Projects
    // let createdProjects = [];

    // for (let i = 0; i < 100; i += 1) {
    //     const title = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    //     const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    //     const link = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    //     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    //     const createdProject = await Project.create({ title, description, link, username });

    //     const updatedUser = await User.updateOne(
    //         { _id: userId },
    //         { $push: { Projects: createdProject._id } }
    //     );

    //     createdProjects.push(createdProject);
    // }



    // create tags
    // const sampleTags = ["MERN", "Node/Express", "front-end", "REACT"];
    // const tagsData = [];
    
    // for (let i = 0; i < 4; i += 1) {
    //     const name = sampleTags[i];
        
    //     tagsData.push( {name} );
       
    // }
    // const createdTags = await Tag.collection.insertMany(tagsData);

    console.log('all done!');
    process.exit(0);
});
