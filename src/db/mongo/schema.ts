import mongoose from 'mongoose';

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<Users>({
  name: { type: String, trim: true, required: [true, 'Please provide a name'] },
  email: { type: String, trim: true, required: true, lowercase: true },
  password: { type: String, required: true },
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model<Users>('User', UserSchema)

