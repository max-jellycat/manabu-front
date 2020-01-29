import { useEffect } from 'react';
import useRouter from './use-router';
import { useAuth } from './use-auth';

const useRequireAuth = (redirectUrl = '/login') => {
  const auth = useAuth();
  const router = useRouter();

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!auth.user) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
};

export default useRequireAuth;
