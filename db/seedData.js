// Create dummy data to seed into your DB
const users = [
  { username: "Elliot", password: 987654321 },
  { username: "Sarah", password: 123456789 },
];
const activities = [
  { name: 'test', description: 'test' },
  { name: 'test1', description: 'test1' },
  { name: 'test2', description: 'test2' },
  { name: 'test3', description: 'test3' },
];
const routines = [
  { creator_id: 1, is_public: true, name: 'test', goal: 'do stuff'},
  { creator_id: 1, is_public: false, name: 'test1', goal: 'do stuff'},
  { creator_id: 2, is_public: true, name: 'test2', goal: 'do stuff'},
  { creator_id: 2, is_public: false, name: 'test3', goal: 'do stuff'},
];
const routine_activities = [];

module.exports = { users, activities, routines, routine_activities };