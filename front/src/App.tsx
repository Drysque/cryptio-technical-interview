import { useEffect, useState } from 'react';

import AppBar from 'AppBar';

import { getHealth } from 'api';

const App = (): JSX.Element => {
  const [APIIsLive, setAPIIsLive] = useState(false);

  useEffect(() => {
    getHealth()
      .then(() => setAPIIsLive(true))
      .catch(() => setAPIIsLive(false));
  }, []);

  return (
    <>
      <AppBar />
      {APIIsLive ? <p>The API is live!</p> : <p style={{ color: 'red' }}>The API did not respond...</p>}
    </>
  );
};

export default App;
