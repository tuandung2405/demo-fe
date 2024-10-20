import { LeaderBoard } from "@/models/LeaderBoard";

function generateSampleUsers(count: number): LeaderBoard[] {
  const users: LeaderBoard[] = [];
  const names = ["John", "Jane", "Bob", "Alice", "Charlie", "Emma", "David", "Olivia", "Michael", "Sophia"];
  const surnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

  for (let i = 0; i < count; i++) {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = surnames[Math.floor(Math.random() * surnames.length)];
    users.push({
      id: i + 1,
      userFullname: `${firstName} ${lastName}`,
      score: Math.floor(Math.random() * 1000) + 500,
      userCode: `${firstName[0]}${lastName[0]}${(i + 1).toString().padStart(3, '0')}`,
      createdDatetime: new Date(Date.now() - Math.floor(Math.random() * 31536000000)), // Random date within the last year
    });
  }

  return users.sort((a, b) => b.score - a.score); // Sort by score in descending order
}

export const sampleUsers = generateSampleUsers(100);
