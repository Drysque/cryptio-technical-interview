import { useState, useEffect, ReactNode } from 'react';
import {
  Divider,
  ListItem,
  ListItemText,
  Table,
  TableContainer as TContainer,
  TableRow as TRow,
  TableHead as THead,
  TableCell as TCell,
  TableBody as TBody,
  TableFooter as TFooter,
  TablePagination as TPagination,
} from '@material-ui/core';

import { getAddressTransaction, InfoResponse, TransactionResponse } from 'api';

import AddressTransactions from './AddressTransactions';

const ListText = ({ p, s }: { p?: ReactNode; s?: ReactNode }): JSX.Element => (
  <ListItem>
    <ListItemText primary={p} secondary={s} />
  </ListItem>
);

type PropsTypes = { info: InfoResponse; addr: string };

export default ({ info, addr }: PropsTypes): JSX.Element => {
  const [txs, setTxs] = useState<TransactionResponse | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!info) return;
    getAddressTransaction(addr, page, rowsPerPage)
      .then(({ data: t }) => setTxs(t))
      .catch(console.error);
  }, [page, rowsPerPage, info]);

  return (
    <>
      <ListText p="hash160" s={info.hash160} />
      <Divider component="li" />
      <ListText p="Satochis" s={info.final_balance} />
      <Divider component="li" />
      <ListText p="BTC" s={(info.final_balance / 100000000).toFixed(8)} />
      <Divider component="li" />
      <ListText p="Transactions" />

      <ListItem>
        <TContainer>
          <Table>
            <THead>
              <TRow>
                <TCell />
                <TCell>Transaction</TCell>
                <TCell>Block Height</TCell>
                <TCell>Size</TCell>
                <TCell>Time</TCell>
                <TCell>Weight</TCell>
                <TCell>Inputs</TCell>
                <TCell>Outputs</TCell>
                <TCell>Result</TCell>
              </TRow>
            </THead>

            <TBody>
              {txs
                ?.sort((l, r) => l.time - r.time)
                .map((t) => (
                  <AddressTransactions key={t.hash} row={t} me={info.address} />
                ))}
            </TBody>

            <TFooter>
              <TRow>
                <TPagination
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
              </TRow>
            </TFooter>
          </Table>
        </TContainer>
      </ListItem>
    </>
  );
};
