import { getUserId } from '@/config/getUserId';
import HomeClient from './HomeClient';
import { dbConnect } from '@/config/db'

export default async function Home() {
  const userId = await getUserId();
  console.log(dbConnect)

  return <HomeClient userId={userId} />;

}
