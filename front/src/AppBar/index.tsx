import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Grid, Switch as MatSwitch } from '@material-ui/core';
import { GitHub } from '@material-ui/icons/';

import { DisplayProvider, useDisplay } from 'context';

const Switch = () => {
  const [{ txsCompact }, setDisplay] = useDisplay();

  return (
    <Typography component="div" style={{ float: 'right' }}>
      <Grid component="label" container alignItems="center">
        <Grid item>detailled vue</Grid>
        <Grid item>
          <MatSwitch
            checked={txsCompact}
            onChange={(_, checked) => {
              setDisplay({
                type: 'txs',
                compact: checked,
              });
            }}
            color="default"
          />
        </Grid>
        <Grid item>compact vue</Grid>
      </Grid>
    </Typography>
  );
};

export default (): JSX.Element => {
  const openGithub = () => window.open('https://github.com/Drysque/cryptio-technical-interview');


  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            Bitcoin Historical Balances
            <IconButton edge="end" onClick={openGithub}>
              <GitHub />
            </IconButton>
          </Grid>
          <Grid item>
            <DisplayProvider>
              <Switch />
            </DisplayProvider>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
