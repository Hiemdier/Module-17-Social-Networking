import { generateUsers, generateThoughts, generateFriends } from './data.js';
import connectDB from '../config/connection.js';
import User from '../models/users.js';
import Thought from '../models/thought.js';

async function seedDatabase() {
  await connectDB();
  const users = generateUsers();
  const usersWithFriends = generateFriends(users); // attach friends properly
  const thoughts = generateThoughts(usersWithFriends);

  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.insertMany(usersWithFriends);
  await Thought.insertMany(thoughts);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seedDatabase().catch(console.error);
