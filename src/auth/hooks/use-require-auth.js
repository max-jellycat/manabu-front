import { useEffect } from 'react';
import useRouter from 'common/hooks/use-router';
import { useAuth } from 'auth/context/use-auth';

const useRequireAuth = (redirectUrl = '/login') => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(auth.user);
    if (!auth.user) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
};

export default useRequireAuth;
