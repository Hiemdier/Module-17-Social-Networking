import User from '../models/users.js';
import Thought from '../models/thought.js';
import connectDB from '../config/connection.js';
import { generateUsers, generateThoughts, addRandomFriends, } from '../utils/data.js';
// Function to seed the database
// This function connects to the database, clears existing data, generates new data, and populates the database
const seedDatabase = async () => {
    await connectDB();
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('🗑️ Database cleared!');
    const Users = generateUsers();
    const userFriends = addRandomFriends(Users);
    console.log('👥 Users created!');
    await User.insertMany(userFriends);
    console.log('🤝 Friends added!');
    const thoughts = generateThoughts(userFriends);
    await Thought.insertMany(thoughts);
    console.log('💭 Thoughts created!');
    // Link thought _ids back to users
    for (const thought of thoughts) {
        await User.findByIdAndUpdate(thought.userId, {
            $addToSet: { thoughts: thought._id },
        });
    }
    console.log('🔗 Thoughts linked to users!');
    // Exit seeding
    console.log('✅ Database seeded successfully!');
    console.log('👋 Goodbye!');
    process.exit(0);
};
seedDatabase().catch((err) => {
    console.error('❌ Error seeding database:', err);
    console.error('❌ Exiting process...');
    process.exit(1);
});
