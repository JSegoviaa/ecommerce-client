import { useState, useEffect } from 'react';
import { api } from '../api';
import { GetUser, GetUserResp } from '../interfaces';

export const useUser = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GetUser>();
  const [error, setError] = useState();

  const getUser = async () => {
    try {
      setLoading(true);

      const { data } = await api.get<GetUserResp>(`/users/${id}`, {
        withCredentials: true,
      });

      setUser(data.user);

      setLoading(false);
    } catch (error) {
      const err = error as undefined;
      console.log(error);
      setError(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return { loading, user, error };
};
