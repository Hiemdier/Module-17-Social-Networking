import { Types } from 'mongoose';

export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Sample data for usernames, emails, thoughts, and reactions
// These are used to generate random users, thoughts, and reactions
const usernames = [
  'johndoe',
  'janedoe',
  'dev_guru',
  'code_master',
  'typescript_lover',
  'node_ninja',
  'mongo_enthusiast',
  'css_queen',
  'html_hero',
  'react_rockstar',
  'vue_viking',
  'angular_admirer',
  'python_prodigy',
  'java_juggler',
];

const emails = usernames.map((u) => `${u}@example.com`);

// Sample emails generated from usernames
// This is a simple way to create unique emails for each user
const thoughtsText = [
  'I love coding!',
  'JavaScript is the best language ever!',
  'TypeScript is a game changer.',
  'Node.js is awesome for backend development.',
  'MongoDB makes data storage so easy.',
  'CSS is a powerful tool for styling.',
  'HTML is the backbone of web development.',
  'React is my favorite library for building UIs.',
  'Vue.js is so flexible and easy to learn.',
  'Angular is great for building large applications.',
  'Python is perfect for data science.',
  'Java is a classic language for enterprise applications.',
  'I love learning new programming languages.'
];

// Sample thoughts text for generating random thoughts
// This is a collection of common phrases or questions that developers might think about
const reactionText = [
  'Great thought!',
  'I totally agree with you.',
  'This is so true!',
  'I have the same opinion.',
  'Interesting perspective!',
  'I never thought about it that way.',
  'Can you elaborate on that?',
  'That makes a lot of sense.',
  'I love this idea!',
  'This is very insightful.',
  'Thanks for sharing your thoughts!',
  'I appreciate your input.',
  'This is a great discussion starter.',
  'I can relate to this.'
];

// Sample reaction text for generating random reactions
// This is a collection of common reactions that users might have to thoughts
export const generateUsers = () => {
  return usernames.map((username, i) => ({
    _id: new Types.ObjectId(),
    username,
    email: emails[i],
    thoughts: [],
    friends: [],
  }));
};

// Function to generate random thoughts for each user
// This function creates a random number of thoughts (1-3) for each user
export const generateThoughts = (users: ReturnType<typeof generateUsers>) => {
  return users.map((user) => {
    const numThoughts = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: numThoughts }, () => {
      const text = getRandomItem(thoughtsText);
      return {
        _id: new Types.ObjectId(),
        thoughtText: text,
        username: user.username,
        userId: user._id,
        reactions: generateReactions(user.username),
      };
    });
  }).flat();
};

// Function to generate random reactions for a thought
// This function creates a random number of reactions (0-2) for each thought
const generateReactions = (excludeUser: string) => {
  const count = Math.floor(Math.random() * 3);
  const reactionUsers = usernames.filter((u) => u !== excludeUser);
  return Array.from({ length: count }, () => ({
    reactionId: new Types.ObjectId(),
    reactionBody: getRandomItem(reactionText),
    username: getRandomItem(reactionUsers),
    createdAt: new Date(),
  }));
};

// Function to add random friends to each user
// This function creates a random number of friends (0-3) for each user
export const addRandomFriends = (users: any[]) => {
  return users.map((user) => {
    const others = users.filter((u) => u._id.toString() !== user._id.toString());
    const friendCount = Math.floor(Math.random() * 4);
    const friendIds = Array.from(new Set(Array.from({ length: friendCount }, () =>
      getRandomItem(others)._id
    )));
    user.friends = friendIds;
    return user;
  });
};