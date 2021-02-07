import {
  Typography,
  Table,
  Box,
  TableRow as TRow,
  TableHead as THead,
  TableCell as TCell,
  TableBody as TBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Out } from 'api';
import { useDisplay } from 'context';

const useStyle = makeStyles({
  me: {
    color: 'blue',
  },
  gain: {
    color: 'green',
  },
  loss: {
    color: 'red',
  },
});

type PropsTypes = {
  rows: Out[];
  name: string;
  gain?: boolean;
  me: string;
};

export default ({ rows, name, gain, me }: PropsTypes): JSX.Element => {
  const [{ txsCompact }] = useDisplay();
  const classes = useStyle();

  if (!rows.length) return <></>;

  const getColor = (addr: string) => {
    if (addr === me && !txsCompact) return gain ? classes.gain : classes.loss;
    return undefined;
  };

  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        {name}
      </Typography>
      <Table size="small">
        <THead>
          <TRow>
            <TCell>Address</TCell>
            <TCell>Script</TCell>
            <TCell>Value</TCell>
          </TRow>
        </THead>

        <TBody>
          {rows.map(({ addr, value, script }, i) => (
            <TRow key={i}>
              <TCell className={addr === me && !txsCompact ? classes.me : undefined}>{txsCompact ? 'You' : addr}</TCell>

              <TCell>{script}</TCell>

              <TCell className={getColor(addr)}>{value}</TCell>
            </TRow>
          ))}
        </TBody>
      </Table>
    </Box>
  );
};
