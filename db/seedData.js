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
  { creatorId: 1, isPublic: true, name: 'test', goal: 'do stuff'},
  { creatorId: 1, isPublic: false, name: 'test1', goal: 'do stuff'},
  { creatorId: 2, isPublic: true, name: 'test2', goal: 'do stuff'},
  { creatorId: 2, isPublic: false, name: 'test3', goal: 'do stuff'},
];
const routineActivities = [
  { routineId: 1, activityId: 1, duration: 1, count: 1},
  { routineId: 1, activityId: 2, duration: 1, count: 1},
  { routineId: 2, activityId: 1, duration: 1, count: 1},
  { routineId: 2, activityId: 2, duration: 1, count: 1},
];

module.exports = { users, activities, routines, routineActivities };