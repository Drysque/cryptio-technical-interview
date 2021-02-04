import { AxiosError } from 'axios';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { getAddressInfo } from '../api';

export default (): JSX.Element => {
  const [addr, setAddr] = useState('');
  const [loading, setLoadState] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const history = useHistory();

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

  return (
    <>
      <TextField
        onChange={({ target: { value } }) => setAddr(value)}
        value={addr}
        error={error !== undefined}
        label="Bitcoin Address"
        helperText={error}
        disabled={loading}
      />
      <Button disabled={loading} variant="contained" color="primary" onClick={handleClick}>
        Search
      </Button>
    </>
  );
};
