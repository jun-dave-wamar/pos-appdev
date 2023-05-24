import { useQuery } from 'react-query';

export function useGetCustomer() {
  const { isLoading, data, error, refetch } = useQuery(
    'customer',
    async () => {
      const response = await fetch('https://pos-appdev-api.vercel.app/api/customer');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      return json.reverse(); // Reverse the array to get newest first
    },
    {
      refetchOnWindowFocus: false, // Disable refetch on window focus
      staleTime: 60000, // Set a 60 second stale time
    }
  );

  return { isLoading, data, error, refetch };
}
