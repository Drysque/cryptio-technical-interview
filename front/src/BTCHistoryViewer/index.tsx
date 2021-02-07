import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IconButton,
  Card,
  CardContent,
  Grid,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { getAddressInfo, InfoResponse } from 'api';

import AddressInfos from './AddressInfos';

type ParamTypes = {
  addr: string;
};

export default (): JSX.Element => {
  const { addr } = useParams<ParamTypes>();
  const history = useHistory();
  const [info, setInfo] = useState<InfoResponse | undefined>(undefined);

  useEffect(() => {
    getAddressInfo(addr)
      .then(({ data: i }) => setInfo(i))
      .catch(console.error);
  }, []);

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

                {info ? <AddressInfos info={info} addr={addr} /> : <LinearProgress />}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </>
  );
};
