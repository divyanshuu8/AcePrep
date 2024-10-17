//models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },  // Indicates if the user is an admin
  subscriptionType: {                           // Indicates if the user is free or paid
    type: String,
    enum: ['free', 'paid'],                     // Only allows 'free' or 'paid' as valid values
    default: 'free'                             // Default value is 'free'
  },
});


// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  //this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
