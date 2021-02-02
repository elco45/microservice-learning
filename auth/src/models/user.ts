import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface required to create new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes properties for User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface that describes properties for a User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  //   createdAt: string;
  //   updatedeAt: string;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // transforms the returned JSON
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Custom function with typescript check
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
