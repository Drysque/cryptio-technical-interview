import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IconButton, Card, CardContent, Typography, Grid, Container, TablePagination } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';

import './index.css';

interface ParamTypes {
  addr: string;
}

export default (): JSX.Element => {
  const { addr } = useParams<ParamTypes>();
  const history = useHistory();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>
      <IconButton edge="end" onClick={() => history.goBack()}>
        <KeyboardArrowLeft />
      </IconButton>
      <Grid container justify="center">
        <Container maxWidth="lg">
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Bitcoin Address
              </Typography>
              <Typography gutterBottom>{addr}</Typography>
              <Typography color="textSecondary" gutterBottom>
                {page}
                {rowsPerPage}
              </Typography>
              <TablePagination
                rowsPerPageOptions={[10, 50]}
                count={73}
                page={page}
                onChangePage={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={({ target: { value } }) => {
                  setRowsPerPage(parseInt(value, 10));
                  setPage(0);
                }}
              />
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </>
  );
};
