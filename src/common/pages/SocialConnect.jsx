/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import useAuth from 'common/contexts/auth';

const SocialConnect = ({ match, location }) => {
  const { socialSignIn } = useAuth();

  useEffect(() => {
    const connect = async () => {
      await socialSignIn(match.params.provider, location.search);
    };

    connect();
  }, [socialSignIn]);

  return (
    <div>Redirection & checking validity</div>
  );
};

export default SocialConnect;
