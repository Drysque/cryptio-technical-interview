import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

import AppBar from 'AppBar';
import Search from 'Search';
import BTCHistoryViewer from 'BTCHistoryViewer';
import { getHealth } from 'api';

export default (): JSX.Element => {
  const [APIIsLive, setAPIIsLive] = useState(false);

  useEffect(() => {
    getHealth()
      .then(() => setAPIIsLive(true))
      .catch(() => setAPIIsLive(false));
  }, []);

  return (
    <>
      <AppBar />
      {APIIsLive ? (
        <Router>
          <Switch>
            <Route path="/:addr">
              <BTCHistoryViewer />
            </Route>
            <Route path="/">
              <Search />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Alert severity="error">API did not respond</Alert>
      )}
    </>
  );
};
