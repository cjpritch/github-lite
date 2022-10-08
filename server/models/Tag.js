const { Schema, model } = require('mongoose');

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    }
)

const Tag = model('Tag', TagSchema)


module.exports = TagSchema, Tag