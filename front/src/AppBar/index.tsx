import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Grid, Switch as MatSwitch, Tooltip } from '@material-ui/core';
import { GitHub, ViewStream, ViewHeadline } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

import { useDisplay } from 'context';

const useStyle = makeStyles({
  floatRight: {
    float: 'right',
  },
});

const Switch = () => {
  const [{ txsCompact }, setDisplay] = useDisplay();
  const classes = useStyle();

  return (
    <Typography component="div" className={classes.floatRight}>
      <Grid component="label" container alignItems="flex-end">
        <Grid item>
          <Tooltip arrow title="Detailled View">
            <ViewHeadline />
          </Tooltip>
        </Grid>

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

        <Grid item>
          <Tooltip arrow title="Compact View">
            <ViewStream />
          </Tooltip>
        </Grid>
      </Grid>
    </Typography>
  );
};

export default (): JSX.Element => {
  const openGithub = () => window.open('https://github.com/Drysque/cryptio-technical-interview');

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container alignItems="center">
          <Grid item>
            Bitcoin Historical Balances
            <IconButton edge="end" onClick={openGithub}>
              <GitHub />
            </IconButton>
          </Grid>

          <Grid item>
            <Switch />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
