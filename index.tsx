import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { getENS } from 'ens-light';

type UseENS = (
  address: string,
  { includeAvatar: boolean }
) => [name: string, avatar: string];

export const useENS: UseENS = (address, { includeAvatar }) => {
  const [[name, avatar], setENS] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const getAndSetEnsData = async () => {
      const { name, avatar } = await getENS(address, { includeAvatar });
      setENS(() => [name, avatar]);
    };
    getAndSetEnsData();
  }, [address, includeAvatar]);

  return [name, avatar];
};

export default function App() {
  const [name, avatar] = useENS('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', {
    includeAvatar: true,
  });

  return (
    <figure>
      <img src={avatar} alt={name} height={200} width={200} />
      <figcaption>{name}</figcaption>
    </figure>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
