import { useQuery } from 'react-query';

export function useGetProduct() {
  const { isLoading, data, error, refetch } = useQuery(
    'product',
    async () => {
      const response = await fetch('https://pos-appdev-api.vercel.app/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
       const json = await response.json();
      return json.reverse();
    },
    {
      refetchOnWindowFocus: false, // Disable refetch on window focus
      staleTime: 60000, // Set a 60 second stale time
    }
  );

  return { isLoading, data, error, refetch };
}
