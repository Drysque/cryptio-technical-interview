import { useState } from 'react';
import { IconButton, Collapse, Box, TableRow as TRow, TableCell as TCell, Tooltip } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { Transaction, Out } from 'api';
import { useDisplay } from 'context';

import TransactionElement from './TransactionElement';

const useStyle = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
  padded: { paddingBottom: 0, paddingTop: 0 },
  gain: {
    color: 'green',
  },
  loss: {
    color: 'red',
  },
});

type PropsTypes = { row: Transaction; me: string };

export default ({ row, me }: PropsTypes): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  const [{ txsCompact }] = useDisplay();

  const hashEllipsis = (hash: string) => `${hash.substr(0, 10)}...${hash.substr(hash.length - 10, hash.length)}`;

  const maybeDisplay = (o: Out) => !txsCompact || o.addr === me;
  const inputs = (
    <TransactionElement rows={row.inputs.map((i) => i.prev_out).filter(maybeDisplay)} me={me} name="Inputs" />
  );
  const outputs = <TransactionElement rows={row.out.filter(maybeDisplay)} me={me} name="Outputs" gain />;

  return (
    <>
      <TRow className={classes.root} key={row.hash}>
        <TCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TCell>

        <TCell>
          <Tooltip interactive arrow title={row.hash} classes={{ tooltip: classes.noMaxWidth }}>
            <Box component="div">{hashEllipsis(row.hash)}</Box>
          </Tooltip>
        </TCell>

        <TCell>{row.block_height}</TCell>
        <TCell>{row.size}</TCell>

        <TCell>
          <Tooltip interactive arrow title={new Date(row.time * 1000).toLocaleString()}>
            <Box component="div">{row.time}</Box>
          </Tooltip>
        </TCell>

        <TCell>{row.weight}</TCell>
        <TCell>{row.vin_sz}</TCell>
        <TCell>{row.vout_sz}</TCell>

        <TCell className={row.result < 0 ? classes.loss : classes.gain}>
          {row.result > 0 && '+'}
          {row.result}
        </TCell>
      </TRow>

      <TRow>
        <TCell className={classes.padded} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {inputs}
            {outputs}
          </Collapse>
        </TCell>
      </TRow>
    </>
  );
};
