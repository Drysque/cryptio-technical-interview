import { AxiosError } from 'axios';
import { useState } from 'react';
import { TextField, IconButton, Card, CardActions, CardContent, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, Clear } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';


import { getAddressInfo } from '../api';

const useStyle = makeStyles({
  card: {
    padding: 10,
    margin: 'auto',
    width: '100%',
  },
  container: {
    display: 'flex',
    height: '100%',
  },
});

export default (): JSX.Element => {
  const [addr, setAddr] = useState('');
  const [loading, setLoadState] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const history = useHistory();
  const classes = useStyle();

  const handleClick = () => {
    if (loading) return;
    setLoadState(true);

    getAddressInfo(addr)
      .then(() => history.push(`/${addr}`))
      .catch((err: AxiosError) => {
        setError(err.response?.data ?? err.message);
        setLoadState(false);
      });
  };

  const handleClear = () => {
    if (loading) return;
    setAddr('');
  };

  const validAddress = (a: string): boolean => {
    const regex = /^(1|3|(bc1))[a-zA-Z0-9]+$/;
    console.log(a.length < 26, a.length > 35, regex.test(a));

    return a.length >= 26 && a.length <= 35 && regex.test(a);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <TextField
            fullWidth
            onChange={({ target: { value } }) => setAddr(value)}
            value={addr}
            error={error !== undefined}
            label="Bitcoin Address"
            helperText={error}
            disabled={loading}
          />
        </CardContent>
        <CardActions>
          <IconButton disabled={loading || !addr.length} edge="end" onClick={handleClear}>
            <Clear />
          </IconButton>
          <IconButton disabled={loading || !validAddress(addr)} edge="end" onClick={handleClick}>
            <Search />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};
