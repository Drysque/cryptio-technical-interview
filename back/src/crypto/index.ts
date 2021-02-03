import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import { getRawAddressInfo, ApiError, API_LIMIT } from './remote_api';

const router = Router();

const pagination = 10;

router.get('/address', (req, res) => {
  const { a: addr, p } = req.query;

  if (typeof addr !== 'string') return res.sendStatus(HttpStatus.BAD_REQUEST);

  const page = typeof p === 'string' ? +p : undefined;

  console.log({ addr, page });

  return getRawAddressInfo(addr, page ? Math.floor(page / (API_LIMIT / pagination)) : 0)
    .then((rawInfo) => {
      const { txs, ...info } = rawInfo;
      if (page === undefined) return res.send(info);

      const offset = (page % (API_LIMIT / pagination)) * pagination;
      console.log({ start: offset, end: offset + pagination });
      return res.send(txs.slice(offset, offset + pagination));
    })
    .catch((err: Error) => {
      if (err instanceof ApiError) return res.status(err.status).send(err.message);
      console.error(err);
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});

export default router;
