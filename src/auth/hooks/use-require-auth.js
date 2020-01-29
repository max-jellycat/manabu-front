import { useEffect } from 'react';
import useRouter from 'common/hooks/use-router';
import { useAuth } from './use-auth';

const useRequireAuth = (redirectUrl = '/login') => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
};

export default useRequireAuth;
