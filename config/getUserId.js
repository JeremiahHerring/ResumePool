import { auth } from '@clerk/nextjs/server';

export async function getUserId() {
  const { userId } = auth();
  return userId;
}
