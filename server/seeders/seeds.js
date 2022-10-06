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
    const sampleTags = ['MERN', 'Node/Express', 'front-end'];
    // have list of tags to choose from, following logic will then be changed to choose tags randomly and then apply them to the projects created above

    for (let i = 0; i < 100; i += 1) {
        const name = sampleTags[Math.round(Math.random() * 2) + 1];
        
        const randomProjectIndex = Math.floor(Math.random() * createdProjects.length);
        const { title }  = createdProjects[randomProjectIndex];
        
        
console.log(await Project.findOne({title: title}))
        console.log(title)

        await Project.updateOne(
            { title:  title  },
            { $addToSet: { tags: name  } },  { safe: true, upsert: true }, (err, data) => {
                if (err){
                    console.log(err);
                }
                console.log(data)
                } 
        );
    }

    console.log('all done!');
    process.exit(0);
});
