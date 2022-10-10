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
// new Edit: tags removed in favor of boolean fields in project model

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
        isFrontEnd: {
            type: Boolean,
            default: false
        },
        isBackEnd: {
            type: Boolean, 
            default: false
        },
        isFullStack: {
            type: Boolean,
            default: false
        }
    }
)

const Project = model('Project', ProjectSchema)


module.exports = Project