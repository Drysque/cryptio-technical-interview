import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import AppBar from 'AppBar';
import Search from 'Search';
import BTCHistoryViewer from 'BTCHistoryViewer';
import { getHealth } from 'api';

export default (): JSX.Element => {
  const [APIIsLive, setAPIIsLive] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    getHealth()
      .then(() => setAPIIsLive(true))
      .catch(() => setAPIIsLive(false));
  }, []);

  return (
    <>
      <AppBar />
      {(() => {
        switch (APIIsLive) {
          case true:
            return (
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
            );
          case false:
            return <Alert severity="error">API did not respond</Alert>;
          default:
            return <LinearProgress />;
        }
      })()}
    </>
  );
};
