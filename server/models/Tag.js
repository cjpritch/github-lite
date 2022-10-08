const { Schema, model } = require('mongoose');

const TagSchema = new Schema(
    {
        name: {
            type: String
        }
    }
)

const Tag = model('Tag', TagSchema)


module.exports = Tag