const { Schema, model } = require('mongoose');

// const TagSchema = new Schema(
//     {
//         tagId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId() 
//         },
//         name: {
//             type: String
//         }
//     }
// )
// This has been moved to its own file.  Tag array in project is only storing object ids, want to see if I can get it working better this way

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true,
            unique: true
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ]
    }
)

const Project = model('Project', ProjectSchema)


module.exports = Project