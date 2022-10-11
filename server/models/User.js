const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

//Virtual to return project count, maybe not needed, but added b/c of line 32
UserSchema.virtual('projectCount').get(function() {
  return this.projects.length;
});

const User = model('User', UserSchema);

module.exports = User;