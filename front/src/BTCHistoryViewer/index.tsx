import { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  TablePagination,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
  Collapse,
  Box,
  Tooltip,
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { getAddressTransaction, getAddressInfo, InfoResponse, TransactionResponse, Transaction, Out } from 'api';
import { useDisplay } from 'context';

const useStyle = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
});

interface ParamTypes {
  addr: string;
}

function HistoryElement({ rows, name, meColor, me }: { rows: Out[]; name: string; meColor: string; me: string }) {
  if (!rows.length) return null;

  const [{ txsCompact }] = useDisplay();

  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        {name}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Script</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ addr, value, script }, i) => (
            <TableRow key={i}>
              <TableCell style={{ color: addr === me && !txsCompact ? 'blue' : undefined }}>
                {txsCompact ? 'You' : addr}
              </TableCell>

              <TableCell>{script}</TableCell>
              <TableCell style={{ color: addr === me && !txsCompact ? meColor : undefined }}>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

function Row({ row, me }: { row: Transaction; me: string }) {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  const [{ txsCompact }] = useDisplay();

  const hashEllipsis = (hash: string) => `${hash.substr(0, 10)}...${hash.substr(hash.length - 10, hash.length)}`;

  const maybeDisplay = (o: Out) => !txsCompact || o.addr === me;
  const inputs = (
    <HistoryElement rows={row.inputs.map((i) => i.prev_out).filter(maybeDisplay)} me={me} name="Inputs" meColor="red" />
  );
  const outputs = <HistoryElement rows={row.out.filter(maybeDisplay)} me={me} name="Outputs" meColor="green" />;

  return (
    <Fragment>
      <TableRow className={classes.root} key={row.hash}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Tooltip interactive arrow title={row.hash} classes={{ tooltip: classes.noMaxWidth }}>
            <Box component="div">{hashEllipsis(row.hash)}</Box>
          </Tooltip>
        </TableCell>
        <TableCell>{row.block_height}</TableCell>
        <TableCell>{row.size}</TableCell>
        <TableCell>
          <Tooltip interactive arrow title={new Date(row.time * 1000).toLocaleString()}>
            <Box component="div">{row.time}</Box>
          </Tooltip>
        </TableCell>
        <TableCell>{row.weight}</TableCell>
        <TableCell>{row.vin_sz}</TableCell>
        <TableCell>{row.vout_sz}</TableCell>
        <TableCell style={{ color: row.result < 0 ? 'red' : 'green' }}>
          {row.result > 0 && '+'}
          {row.result}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {inputs}
            {outputs}
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default (): JSX.Element => {
  const { addr } = useParams<ParamTypes>();
  const history = useHistory();
  const [info, setInfo] = useState<InfoResponse | undefined>(undefined);
  const [txs, setTxs] = useState<TransactionResponse | undefined>(undefined);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAddressInfo(addr)
      .then(({ data: i }) => setInfo(i))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!info) return;
    getAddressTransaction(addr, page, rowsPerPage)
      .then(({ data: t }) => setTxs(t))
      .catch(console.error);
  }, [page, rowsPerPage, info]);

  return (
    <>
      <IconButton edge="end" onClick={() => history.goBack()}>
        <KeyboardArrowLeft />
      </IconButton>
      <Grid container justify="center">
        <Container maxWidth="lg">
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Bitcoin Address" secondary={addr} />
                </ListItem>
                <Divider component="li" />

                {info ? (
                  <>
                    <ListItem>
                      <ListItemText primary="hash160" secondary={info.hash160} />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem>
                      <ListItemText primary="Satochis" secondary={info.final_balance} />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem>
                      <ListItemText primary="BTC" secondary={(info.final_balance / 100000000).toFixed(8)} />
                    </ListItem>

                    <Divider component="li" />

                    <ListItem>
                      <ListItemText primary="Transactions" />
                    </ListItem>
                    <ListItem>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell />
                              <TableCell>Transaction</TableCell>
                              <TableCell>Block Height</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Time</TableCell>
                              <TableCell>Weight</TableCell>
                              <TableCell>Inputs</TableCell>
                              <TableCell>Outputs</TableCell>
                              <TableCell>Result</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {txs
                              ?.sort((l, r) => l.time - r.time)
                              .map((t) => (
                                <Row key={t.hash} row={t} me={info.address} />
                              ))}
                          </TableBody>

                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                component="td"
                                rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
                                count={info?.n_tx ?? 0}
                                page={page}
                                onChangePage={(_, newPage) => setPage(newPage)}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={({ target: { value } }) => {
                                  setRowsPerPage(parseInt(value, 10));
                                  setPage(0);
                                }}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <LinearProgress />
                  </>
                )}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </>
  );
};
