import { useEffect, useState } from 'react';
import { fetchUserById, type UserInfoResponse, addCoinsToUser } from '../services/user';

// Custom hook to fetch user information by ID
export const getUserInfo = (userId: string, amount: number) => {
    const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchUserById(userId)
            .then(setUserInfo)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [amount]);

   return { userInfo, loading, error };
};

// Custom hook to add coins to a user
export const useAddCoins = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addCoins = async (userId: number, teamId: number, amount: number) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await addCoinsToUser(userId, teamId, amount);
      setSuccess('Coins added !');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addCoins, loading, success, error };
};