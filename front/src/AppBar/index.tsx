import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { GitHub } from '@material-ui/icons/';

export default (): JSX.Element => {
  const openGithub = () => window.open('https://github.com/Drysque/cryptio-technical-interview');

  return (
    <AppBar position="static">
      <Toolbar>
        Bitcoin Historical Balances
        <IconButton edge="end" onClick={openGithub}>
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
