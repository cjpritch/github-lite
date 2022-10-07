const { Schema, model } = require('mongoose');

const TagSchema = new Schema(
    {
        tagId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId() 
        },
        name: {
            type: String
        }
    }
)

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
        tags: [TagSchema]
    }
)

const Project = model('Project', ProjectSchema)


module.exports = Project