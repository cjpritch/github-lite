const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  isFrontEnd: {
    type: Boolean,
    default: false,
  },
  isBackEnd: {
    type: Boolean,
    default: false,
  },
  isFullStack: {
    type: Boolean,
    default: false,
  },
});

const Project = model('Project', ProjectSchema);

module.exports = Project;
