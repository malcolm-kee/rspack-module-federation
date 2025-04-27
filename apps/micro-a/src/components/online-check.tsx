import { useQuery } from '@rspack-mf/utils';

export const OnlineCheck = () => {
  const { data: isOnline } = useQuery({
    queryKey: ['onlineCheck'],
    queryFn: () => navigator.onLine,
  });

  return <div>{isOnline ? 'Online' : 'Offline'}</div>;
};
