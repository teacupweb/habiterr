import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';

export default async function useAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}
