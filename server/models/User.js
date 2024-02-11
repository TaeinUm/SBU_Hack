import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the Product schema
const productSchema = new mongoose.Schema({
  index: Number,
  productName: String,
  expdate: Date,
  donatable: Boolean
});

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  receipt: { type: String, required: false },
  products: [productSchema] // Embed the Product schema here as an array
}, { timestamps: true });

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
