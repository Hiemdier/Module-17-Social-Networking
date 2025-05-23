import User from '../models/users.js';
import Thought from '../models/thought.js';
import { connectDB } from '../config/connection.js';
import { generateUsers, generateThoughts, addRandomFriends, } from '../utils/data.js';
// Function to seed the database
// This function connects to the database, clears existing data, generates new data, and populates the database
const seedDatabase = async () => {
    await connectDB();
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('🗑️ Database cleared!');
    const rawUsers = generateUsers();
    console.log('👥 Users created!');
    const usersWithFriends = addRandomFriends(rawUsers);
    console.log('🤝 Friends added!');
    await User.insertMany(usersWithFriends);
    const thoughts = generateThoughts(usersWithFriends);
    await Thought.insertMany(thoughts);
    console.log('💭 Thoughts created!');
    // Link thought _ids back to users
    for (const thought of thoughts) {
        await User.findByIdAndUpdate(thought.userId, {
            $addToSet: { thoughts: thought._id },
        });
    }
    console.log('🔗 Thoughts linked to users!');
    console.log('✅ Database seeded!');
    console.log('👋 Goodbye!');
    process.exit(0);
};
seedDatabase().catch((err) => {
    console.error('🙅 error seeding database:', err);
    process.exit(1);
});
