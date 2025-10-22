// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/profileDB');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  skills: [String],
  experience: [String],
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: 'Profile created!' });
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.listen(3000, () => console.log('Server running on port 3000'));
