import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import { getAddressInfo, ApiError } from './remote_api';

const router = Router();

router.get('/address', (req, res) => {
  const { a: addr } = req.query;

  if (typeof addr !== 'string') return res.sendStatus(HttpStatus.BAD_REQUEST);

  return getAddressInfo(addr)
    .then((info) => res.send(info))
    .catch((err: Error) => {
      if (err instanceof ApiError) return res.status(err.status).send(err.message);
      console.error(err);
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

export default router;
